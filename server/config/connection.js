const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bit-by-bit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
