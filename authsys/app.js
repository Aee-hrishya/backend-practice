const express = require("express");
const bcrypt = require("bcryptjs"); //bcrypt helps us encrypt the passwords that we get.
const jwt = require("jsonwebtoken"); //importing the jsonwebtoken package for generating the tokens.
const user = require("./model/user"); //importing the database model.
const connection = require("./config/database"); //Getting the database connection.
const auth = require("./middleware/auth"); //Here we import the custom middleware we have created.

connection.connect(); //executing the connect() method which establishes the connection.

//creating an express app
const app = express();
app.use(express.json()); //As express cannot handle json data we need to use this middleware for it.

app.get("/", (req, res) => {
  res.send("<h1>Hello everyone</h1>");
});

//This is the register route that is hit whenever a user registers on the frontend and we perform validations on it.
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, password, email } = req.body; //Getting the stuff from the request body.

    //This is our custom check for checking whether all the fields are filled or not. mongoose has inbuilt validations but we will use them later.
    if (!(firstname && lastname && password && email)) {
      res.status(400).send("All fields are required");
    }

    //Now we need to check whether the user has already registered or not.
    //As fetching data can take time use await over here so that we wait for the action to happen, so we also need to declare the entire method as async as async await go together.
    const userExists = await user.findOne({ email }); //We have used a mongoose method here to check whether the email already exists or not.

    //Our custom check.
    if (userExists) {
      res.status(401).send("User already exists!");
    }

    //Encrypting the password using the bcrypt.js package.
    const encryptedPass = await bcrypt.hash(password, 10); //10 here means that we can go through 10 rounds for hashing the password. which is usually a good number for hashing the passwords.

    // Using the model we have created now we create an actual user with its schema.
    const myUser = await user.create({
      firstname,
      lastname,
      password: encryptedPass, //We pass the encrypted password here for protection.
      email: email.toLowerCase(), //We also set the email to lowercase in order to avoid inconsistencies.
    });

    //Token creation.
    const token = jwt.sign(
      //The token basically has 3 parts the header, payload and the signature, here using the jsonwebtoken we are just providing the payload and other things are being taken care of by the jsonwebtoken package.
      {
        user_id: user._id,
        email,
      },
      process.env.SECRET_KEY, //The secret key for the token

      //This tells in how much time do we need to expire the token.
      {
        expiresIn: "2h",
      }
    );

    myUser.token = token; //Setting the myUser.token to the token that we got after generating the token for that user.

    //setting this to undefined doesn't send the password in the token.
    myUser.password = undefined;

    res.status(201).json(myUser);
  } catch (error) {
    console.log(error);
  }
});

//Route when the user tries to login.
app.post("/login", async (req, res) => {
  try {
    //As the user is login in we will only receive the email and the password of the user.
    const { email, password } = req.body;

    //if email and the password is not filled then we pop the below message.
    if (!(email && password)) {
      res.status(400).send("All fields are required.");
    }

    //Finding the user based on their email from the database.
    const userExists = await user.findOne({ email });

    //if the user exists and password also matches then move forward.
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      //Create a token for the user.
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      userExists.token = token; //set the created token to the token of the user.
      userExists.password = undefined; //set the password to undefined as you don't want to show the password to the user.

      res.status(200).json(userExists);
    } else {
      res
        .status(400)
        .send(
          "Incorrect username or password OR You are not registered on the application"
        );
    }
  } catch (error) {
    console.log(error);
  }
});

//We can use the middleware auth here to check if the user is authorized or not. In this way we can protect routes and can only let specific users access certain routes.
app.get("/dashboard", auth, (req, res) => {
  res.status(200).send("Welcome authorized user!");
});

module.exports = app; //exporting the entire module named app.
