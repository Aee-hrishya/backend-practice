const mongoose = require("mongoose"); //importing mongoose for creating the schema and the object.

const { Schema } = mongoose; //destructuring the Schema out of the mongoose.

//Here we design the schema of our users table.
const userSchema = new Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
  },
});

//here we are exporting the model of the schema that we want to create a model from.
module.exports = mongoose.model("user", userSchema); //Here user is the name of the schema that we want to set.
