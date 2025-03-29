const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGO_URI")}`)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose.connection;
