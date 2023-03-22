const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
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
  level: {
    type: Number,
    default: 1,
  },
});

module.exports = farmSchema;
