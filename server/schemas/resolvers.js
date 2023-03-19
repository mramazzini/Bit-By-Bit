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
      console.log(directoryPath);
      //Get upgrades from json and populate the model
      const fileData = await fs.readFile(directoryPath, "utf8");

      const upgrades = await JSON.parse(fileData).upgrades;
      const gameName = args.username + "'s Game";
      const newGame = {
        score: 0,
        name: gameName,
        upgrades: await upgrades,
        click_multiplier: 1,
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

    updateGame: async (parent, { score }, context) => {
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
    },

    purchaseUpgrade: async (
      parent,
      { name, price, score, effect, dependencies },
      context
    ) => {
      // check if user can afford upgrade
      const user = await User.findOne({ _id: context.user._id });

      //find the required dependencies
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
        if (effect.substring(0, 16) === "click_multiplier") {
          var bonk_multiplier = parseInt(effect.substring(17));
        }

        //Purchase the upgrade
        await User.findOneAndUpdate(
          {
            _id: context.user._id,
            "game.upgrades": { $elemMatch: { name: name } },
          },
          {
            $set: {
              "game.upgrades.$.status": "purchased",
              "game.score": score - price,
            },
            $mul: {
              "game.click_multiplier": bonk_multiplier,
            },
          },

          { new: true }
        );

        //Find the purchased upgrade unlocks and set their status to shown
        const purchasedUpgrade = user.game.upgrades.find(
          (upgrade) => upgrade.name === name
        );
        console.log("PU", purchasedUpgrade);
        const upgradesWithUnlocks = user.game.upgrades.filter((upgrade) =>
          purchasedUpgrade.unlocks.includes(upgrade.name)
        );
        console.log("UU", upgradesWithUnlocks);
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
  },
};

module.exports = resolvers;
