const express = require("express");
const user = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./config/database");

const app = express();
connection.connect();

//Middlewares.
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome User!!");
});

//render the register form on the registerme endpoint.
app.get("/registerme", (req, res) => {
  res.render("registerForm");
});

//This is where the user is actually registered.
app.post("/register", async (req, res) => {
  try {
    const email = await req.body.email;
    console.log(email);
    const password = await req.body.password;
    console.log(password);

    if (!(email && password)) {
      res.status(400).send("All fields are required.");
      console.log("something is missing.");
    }

    //Checking if the user already exists or not.
    const userExists = await user.findOne({ email });
    if (userExists) {
      res.send("User with the same email ID already exists!");
    }

    //Hashing the received password.
    const hashedPass = await bcrypt.hash(password, 10);

    //creating a new user into the database.
    const newUser = await user.create({
      email: email.toLowerCase(),
      password: hashedPass,
    });

    //Token creation for the new user.
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    newUser.token = token;
    newUser.password = undefined;

    res.status(201).json(newUser);
  } catch (error) {
    console.log("There is some error " + error);
  }
});

//render the login form on the /loginme endpoint.
app.get("/loginme", (req, res) => {
  res.render("loginForm");
  //   res.send(req.body);
});

module.exports = app;
