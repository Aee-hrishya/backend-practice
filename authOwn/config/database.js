require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connected successfully!"))
    .catch((err) => {
      console.log("DB connection failed.");
      console.log(err);
      process.exit(1);
    });
};
