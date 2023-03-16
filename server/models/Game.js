const mongoose = require("mongoose");
const upgradeSchema = require("./Upgrades");
const gameSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 0,
  },
  upgrades: [upgradeSchema],
});

module.exports = gameSchema;
