const express = require("express");
const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Welcome User!!");
});

app.get("/registerme", (req, res) => {
  res.render("registerForm");
});

//render the login form on the /loginme endpoint.
app.get("/loginme", (req, res) => {
  res.render("loginForm");
  //   res.send(req.body);
});

module.exports = app;
