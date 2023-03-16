const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const mongoose = require("mongoose");
const { signToken } = require("../utils/auth");
const fs = require("fs").promises;
const path = require("path");

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
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      const fileData = await fs.readFile("./seeds/upgrades.json");
      const upgrades = JSON.parse(fileData).upgrades;

      console.log(upgrades);

      const newGame = {
        score: 0,
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
      const updatedGame = {
        score: score,
      };

      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $set: {
            game: updatedGame,
          },
        }
      );

      return updatedGame;
    },
  },
};

module.exports = resolvers;
