const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

const app = express();

//These are the things using which we can access the cloudinary API. This is available on the dashboard of your cloudinary account.
cloudinary.v2.config({
  api_key: "858637673369815",
  api_secret: "WT3KDYsXikihf_vV46HITKqZ0WM",
  cloud_name: "dqxluhfus",
});

//As we have imported the ejs package we can use it to create webpages directly using javascript. We use it as a middleware so we use it as mentioned below. Usually all the files in the ejs are kept in a separate folder called views that's what we have done.
app.set("view engine", "ejs");
app.use(express.json());
//this middleware helps us send the data that is in the url encoded form. extended: true allows us to handle complicated response in json format.
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    //These things will come in handy when we want to save the files uploaded to our server or on AWS, cloudinary etc.
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); //middleware for handling files as express can't handle files on its own.

app.listen(4000, () => {
  console.log("Hey there upload some forms and images.");
});

app.get("/myget", (req, res) => {
  //   res.send(req.body);
  //VVVIMP:- when we use templating libraries like the ejs the data truly travels through the url hence we have to send the response as req.query. But when we use other things like react or angular etc. that time we need to use req.body as here data doesn't truly come from the query but via the request body.
  res.send(req.query);
});

//Here we use the post form to send data in the form of request body and then display here.
app.post("/mypost", async (req, res) => {
  console.log(req.files);

  //Grabbing the file from the post form, samplefile is the name attribute used for the inpput type file in the form.
  let file = req.files.samplefile;

  //this is how we upload image to cloudinary using the upload API refer docs for this. Here we have  also specified the folder to which we want to upload the image.
  //The tempFilePath is provided to us by the express file upload. We have used declared it earlier. We can send this path which is a string to cloudinary for upload as it requires a string only.
  result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
  });

  console.log(result);

  const details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
  };
  res.send(details);
});

app.get("/mygetform", (req, res) => {
  //we use the render() when we want to render a page on the particular endpoint. Inside render we can simply put the name of the file as all the files inside the views folder are automatically checked by ejs.
  res.render("getForm");
});

//Even though we have the post form we are still using the get here as we want to serve this form on the mypostform endpoint. Hence no need to use post here.
app.get("/mypostform", (req, res) => {
  res.render("postForm");
});
