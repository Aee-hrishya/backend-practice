const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");

const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json()); // we use this for post requests when data is sent and went want to parse the body of the data to json.
app.use(fileUpload()); // We use this middleware for handling the file uploads as express cannot handle file uploads on its own.

app.listen(4000, () => console.log("Server is running on port 4000"));

let products = [
  {
    id: 12,
    name: "macbook",
    company: "Apple",
  },
  {
    id: 13,
    name: "chromebook",
    company: "Microsoft",
  },
  {
    id: 16,
    name: "galaxy tab",
    company: "Samsung",
  },
];

app.get("/", (req, res) => {
  res.send("This is the new project");
});

app.get("/api/v1/products", (req, res) => {
  res.send(`The product has been retrieved.`);
});

//Sending an object as a response
app.get("/api/v1/productsobject", (req, res) => {
  res.status(200).send({
    id: 1,
    name: "Macbook M1",
    company: "Apple",
  });
});

//Sending an array as a response.
app.get("/api/v1/productarray", (req, res) => {
  res.status(200).send(products);
});

//Getting the param from the url and checking if it matches some data at the backend and returning it.
app.get("/api/v1/myproduct/:productId", (req, res) => {
  const myProduct = products.find(
    (product) => product.id == req.params.productId
  );
  res.status(200).send(myProduct);
});

//Making a post request and adding a product to our array.
app.post("/api/v1/addProduct", (req, res) => {
  console.log(req.body);
  products.push(req.body); //We usuall don't push stuff directly into the array we do some refinement and then it is pushed.
  res.send("Product added successfully");
});

//To get the location and device from the query and send it as a response.
//This is especially helpful data is sent through the url, like when we type some stuff into the search bar. Then we can easily get the data from the query and perform certain operations.
app.get("/api/v1/productquery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

//To handle the post request for images. see documentaion for more. https://www.npmjs.com/package/express-fileupload
app.post("/api/v1/productupload", (req, res) => {
  let file = req.files.file; //we can access the file using the req.files and after that put the name that you have used in your frontend to name the file.
  let path = __dirname + "/images/" + Date.now() + ".jpg"; //using this we can access the images folder in this directory and save the image there. This way is not ideal but doing this we can store stuff on the server itself.

  //Using file.mv we can move the path to the database or cloud whereever we want.
  file.mv(path, (err) => {
    res.send(true);
    if (err) {
      console.log("There is some error in the file path.");
    }
  });
});
