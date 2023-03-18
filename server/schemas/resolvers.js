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
    clickMultiplier: async (parent, args, context) => {
      //find users purcahsed upgrades and return the final click multiplier

      const user = await User.findOne({ _id: context.user._id });

      const upgrades = user.game.upgrades;
      let bonk_multiplier = 1;

      upgrades.forEach((upgrade) => {
        if (
          upgrade.effect === "bonk_multiplier_2" &&
          upgrade.status === "purchased"
        ) {
          bonk_multiplier *= 2;
        }
      });

      return bonk_multiplier;
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

    purchaseUpgrade: async (parent, { name, price, score }, context) => {
      // check if user can afford upgrade
      console.log(score, price);
      if (score >= price) {
        const user = await User.findOneAndUpdate(
          {
            _id: context.user._id,
            "game.upgrades": { $elemMatch: { name: name } },
          },
          {
            $set: {
              "game.upgrades.$.status": "purchased",
              "game.score": score - price,
            },
          },

          { new: true }
        );
        console.log(user);
        return "purchased";
      } else {
        return "not enough score";
      }
    },
  },
};

module.exports = resolvers;
