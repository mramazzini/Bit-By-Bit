const mongoose = require("mongoose");
const upgradeSchema = require("./Upgrades");
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  upgrades: [upgradeSchema],
  click_multiplier: {
    type: Number,
    default: 1,
  },
});

module.exports = gameSchema;
