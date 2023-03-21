const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["purchased", "hidden"],
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
  cost: {
    type: Number,
    required: true,
    default: 10,
  },
});

module.exports = farmSchema;
