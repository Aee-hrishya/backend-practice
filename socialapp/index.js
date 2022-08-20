const express = require("express");
const format = require("date-format");

//We are using the npm date-format package here so that we can use dates in the readable format.
const date = format.asString(new Date());

//create and express app.
const app = express();

//Swagger docs related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000; //if anything is present in the process.env then use that port or Set the port to 4000.

//Listen on port provided.
app.listen(PORT, () => {
  console.log("Everything is fine.");
});

//Now we need to get something when we are listening on the specified port, for that we can do something like this-
//Basically we are getting the home url and then we are sending the response of Hello World here and thats it, we can also send status along with the response, though the user won't be able to see this but we can check it via postman.

//This is the home route of our application.
app.get("/", (req, res) => {
  res.status(200).send("Hello world"); //We are sending a response here.
});

//This is the instagram route for the application.
app.get("/api/v1/instagram", (req, res) => {
  const instaSocial = {
    username: "hrishi___",
    followers: 430,
    follows: 120,
    date: date,
    time: "22:05:00",
  };

  //We want to send a json object so we use json() method instead of plain send().
  res.status(200).json(instaSocial);
});

//The facebook route.
app.get("/api/v1/facebook", (req, res) => {
  const facebookSocial = {
    username: "Hrishikesh Shinde",
    followers: 2323,
    follows: 234,
    date: date,
  };

  res.status(200).json(facebookSocial);
});

//The linkedIn route.
app.get("/api/v1/linkedin", (req, res) => {
  const linkedinSocial = {
    username: "Hrishikesh Shinde",
    followers: 232323,
    follows: 2,
    date: date,
  };

  res.status(200).json(linkedinSocial);
});

//If the user hits any other endpoint we need to get the endpoint and display it. To grab the endpoint we can use : and then we can name that anything.
//Note that the unknown route method needs to be placed at the last as express will scan the document from top to bottom, if we place it above then we will face issues in all the other routes.
app.get("/api/v1/:token", (req, res) => {
  const endpoint = req.params.token; //request for the params token and store it somewhere.
  const stringifiedEndpoint = JSON.stringify(endpoint); //As it is a json response we need to convert it into a string.
  res.status(200).send(`${stringifiedEndpoint} is not a valid endpoint`); //Now we can send the response what we want using that token as well.
});
