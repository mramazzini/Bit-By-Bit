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
      console.log(user);
      return user.game.upgrades;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(__dirname);
      const token = signToken(user);
      let fileData;
      //Get upgrades from json and populate the model
      await fs.readFile("./seeds/upgrades.json", "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        fileData = data;
        console.log(data);
      });

      const upgrades = JSON.parse(fileData).upgrades;
      const gameName = args.username + "'s Game";
      const newGame = {
        score: 0,
        name: gameName,
        upgrades: upgrades,
      };

      await User.findOneAndUpdate(
        { username: args.username },
        {
          $set: {
            game: newGame,
          },
        }
      );

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "User was not found with this email... Please try again!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Please check the credentials!");
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

    purchaseUpgrade: async (parent, { name }, context) => {
      const user = await User.findOneAndUpdate(
        {
          _id: context.user._id,
          "game.upgrades": { $elemMatch: { name: name } },
        },
        { $set: { "game.upgrades.$.status": "purchased" } },
        { new: true }
      );
      return "purchased";
    },
  },
};

module.exports = resolvers;
