const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  token: String,
});

module.exports = mongoose("user", userSchema);
