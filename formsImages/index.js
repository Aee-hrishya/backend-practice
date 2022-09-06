const express = require("express");

const app = express();

//As we have imported the ejs package we can use it to create webpages directly using javascript. We use it as a middleware so we use it as mentioned below. Usually all the files in the ejs are kept in a separate folder called views that's what we have done.
app.set("view engine", "ejs");
app.use(express.json());
//this middleware helps us send the data that is in the url encoded form. extended: true allows us to handle complicated response in json format.
app.use(express.urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log("Hey there upload some forms and images.");
});

app.get("/myget", (req, res) => {
  //   res.send(req.body);
  //VVVIMP:- when we use templating libraries like the ejs the data truly travels through the url hence we have to send the response as req.query. But when we use other things like react or angular etc. that time we need to use req.body as here data doesn't truly come from the query but via the request body.
  res.send(req.query);
});

app.get("/mygetform", (req, res) => {
  //we use the render() when we want to render a page on the particular endpoint. Inside render we can simply put the name of the file as all the files inside the views folder are automatically checked by ejs.
  res.render("getForm");
});

//Even though we have the post form we are still using the get here as we want to serve this form on the mypostform endpoint. Hence no need to use post here.
app.get("/mypostform", (req, res) => {
  res.render("postForm");
});
