require("dotenv").config();
const express = require("express");
const app = require("./app");

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("Server has started on port 4000");
});
