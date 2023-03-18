const mongoose = require("mongoose");

const upgradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  status: {
    type: String,

    enum: ["shown", "purchased", "hidden"],
    default: "hidden",
  },
  description: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  effect: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = upgradeSchema;
