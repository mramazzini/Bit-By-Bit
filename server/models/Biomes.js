const mongoose = require("mongoose");
const farmSchema = require("./Farms");
const biomeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  farms: [farmSchema],
  currency: {
    amount: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "points",
    },
    conversion_rate: {
      type: Number,
      default: 1,
    },
  },

  completion_percentage: {
    type: Number,
    default: 0,
  },
});

module.exports = biomeSchema;
