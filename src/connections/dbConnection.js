const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const connect = () => {
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected To Database...");
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database...");
  });
};

module.exports = connect;
