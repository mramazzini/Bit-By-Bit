const mongoose = require("mongoose");

const upgradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["shown", "purchased", "hidden"],
    default: "hidden",
  },
  flavor: {
    type: String,
    required: true,
  },
  effect: {
    type: String,
    required: true,
  },
});

module.exports = upgradeSchema;
