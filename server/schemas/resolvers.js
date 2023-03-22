const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const { signToken } = require("../utils/auth");
const fs = require("fs").promises;

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    game: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return user.game;
    },
    upgrades: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });

      return user.game.upgrades;
    },
    biomes: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return user.game.biomes;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      let directoryPath;
      if (process.env.NODE_ENV === "production") {
        directoryPath = "server/seeds/upgrades.json";
      } else {
        directoryPath = "./seeds/upgrades.json";
      }

      //Get upgrades from json and populate the model
      const fileData = await fs.readFile(directoryPath, "utf8");

      const upgrades = await JSON.parse(fileData).upgrades;
      const gameName = args.username + "'s Game";
      const newGame = {
        score: 0,
        name: gameName,
        upgrades: await upgrades,
        click_multiplier: 1,
        biomes: [],
      };

      await User.findOneAndUpdate(
        { username: args.username },
        {
          $set: {
            game: await newGame,
          },
        }
      );

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.findOne({ username: email });
      }
      if (!user) {
        throw new AuthenticationError("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateGame: async (parent, { score, type }, context) => {
      if (type === "score") {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              "game.score": score,
            },
          },
          { new: true }
        );

        return user;
      }
    },

    purchaseUpgrade: async (parent, { name, score }, context) => {
      // check if user can afford upgrade
      const user = await User.findOne({ _id: context.user._id });

      //Get directories for JSON seed files depending on environment
      let directoryPathUpgrades;
      let directoryPathBiomes;
      let directoryPathFarms;
      if (process.env.NODE_ENV === "production") {
        directoryPathUpgrades = "server/seeds/upgrades.json";
        directoryPathBiomes = "server/seeds/biomes.json";
        directoryPathFarms = "server/seeds/farms.json";
      } else {
        directoryPathUpgrades = "./seeds/upgrades.json";
        directoryPathBiomes = "./seeds/biomes.json";
        directoryPathFarms = "./seeds/farms.json";
      }

      //Get upgrades from json
      const fileDataUpgrades = await fs.readFile(directoryPathUpgrades, "utf8");
      const upgrades = await JSON.parse(fileDataUpgrades).upgrades;

      //Get the upgrade that was purchased
      const purchasedUpgrade = await upgrades.find((obj) => obj.name === name);

      //Get the variables of the upgrade
      const { price, effect, dependencies, unlocks } = await purchasedUpgrade;

      //find the required dependencies to see if user can purchase the upgrade
      const upgradesWithDependencies = user.game.upgrades.filter((upgrade) =>
        dependencies.includes(upgrade.name)
      );

      // Filter upgrades that have status field equal to "purchased"
      const allPurchased = upgradesWithDependencies.every(
        (upgrade) => upgrade.status === "purchased"
      );

      //If user can afford it and all the dependencies are purchased
      if (score >= price && allPurchased) {
        //If user purcahsed click upgrade, update click multiplier
        let bonk_multiplier = 1;
        if (effect.substring(0, 16) === "click_multiplier") {
          bonk_multiplier = parseInt(effect.substring(17));
        }
        //If user purchased a biome, add it to the game.biomes array
        let purchasedBiome = "";
        if (effect.substring(0, 12) === "biome_unlock") {
          const biome = effect.substring(13);

          //Get biomes from json
          const fileData = await fs.readFile(directoryPathBiomes, "utf8");

          const biomes = await JSON.parse(fileData).biomes;

          purchasedBiome = biomes.find((obj) => obj.name === biome);
        }
        //If user purchased a biome farm, add it to the game.biomes.farm array
        let purchasedFarm = "";
        let biomeName = "";
        if (effect.substring(0, 11) === "farm_unlock") {
          const farm = effect.substring(12);
          const fileData = await fs.readFile(directoryPathFarms, "utf8");
          biomeName = effect.substring(12, 16);
          const farms = await JSON.parse(fileData);
          purchasedFarm = farms[biomeName].find((obj) => obj.name === farm);
        }

        //Purchase the upgrade
        let updateObject = {
          $set: {
            "game.upgrades.$.status": "purchased",
            "game.score": score - price,
          },
        };
        // If biome has a value, add it to the game.biomes array
        if (purchasedBiome) {
          updateObject.$addToSet = {
            "game.biomes": purchasedBiome,
          };
        }
        //If bonk_multiplier has a value, multiply the click multiplier
        if (bonk_multiplier !== 1) {
          updateObject.$mul = {
            "game.click_multiplier": bonk_multiplier,
          };
        }
        //If farm has a value, add it to the game.biomes.farm array
        if (purchasedFarm) {
          const biomeIndex = user.game.biomes.findIndex(
            (biome) => biome.name === biomeName
          );
          const key = "game.biomes." + biomeIndex + ".farms";

          updateObject.$addToSet = {
            [key]: purchasedFarm,
          };
        }

        //Send mongo mutation
        await User.findOneAndUpdate(
          {
            _id: context.user._id,
            "game.upgrades": { $elemMatch: { name: name } },
          },
          updateObject,
          { new: true }
        );

        //Find the purchased upgrade unlocks and set their status to shown
        const upgradesWithUnlocks = user.game.upgrades.filter((upgrade) =>
          unlocks.includes(upgrade.name)
        );

        upgradesWithUnlocks.forEach(async (upgrade) => {
          await User.findOneAndUpdate(
            {
              _id: context.user._id,
              "game.upgrades": { $elemMatch: { name: upgrade.name } },
            },
            { $set: { "game.upgrades.$.status": "shown" } }
          );
        });

        return "purchased";
      } else {
        return "not enough score";
      }
    },
    purchaseFarmUpgrade: async (parent, { name, score }, context) => {
      // check if use can afford upgrade
      const user = await User.findOne({ _id: context.user._id });

      const biome = user.game.biomes.find(
        (biome) => biome.name === name.substring(0, 4)
      );

      const biomeIndex = {
        snow: 0,
      };

      const price = biome.farms.find((farm) => farm.name === name).cost;

      if (score >= price) {
        //Purchase the upgrade
        try {
          const key =
            "game.biomes." + biomeIndex[biome.name.substring(0, 4)] + ".farms";

          const costKey = key + ".$.cost";
          const levelKey = key + ".$.level";

          await User.findOneAndUpdate(
            {
              _id: context.user._id,
              [key]: { $elemMatch: { name: name } },
            },
            {
              $set: {
                "game.score": score - price,
                [costKey]: Math.floor(price + price * 0.15),
              },
              $inc: {
                [levelKey]: 1,
              },
            },
            { new: true }
          );
        } catch (err) {
          console.log(err);
        }
        return "purchased";
      }
    },
  },
};

module.exports = resolvers;
