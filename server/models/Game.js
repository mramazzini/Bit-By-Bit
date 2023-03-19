const mongoose = require("mongoose");
const upgradeSchema = require("./Upgrades");
const biomeSchema = require("./Biomes");
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },

  click_multiplier: {
    type: Number,
    default: 1,
  },
  upgrades: [upgradeSchema],
  biomes: [biomeSchema],
});

module.exports = gameSchema;
