require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

//instead of holding the mongodb connection in a variable and then exporting it we can directly export it using this.
exports.connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true, //As mongodb has changed its parser this tells node to use the latest parser and if any problem is found then switch to the old parser.
      useUnifiedTopology: true,
    })
    .then(console.log("DB connected successfully!"))
    .catch((err) => {
      console.log("DB connection failed!");
      console.log(err);
      process.exit(1); //This tells the nodejs to exit as soon as possible even if there are certain operations that need to be performed.
    });
};
