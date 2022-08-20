require("dotenv").config(); //Getting the .env file as it is in the root folder we use the config() or else we need to add more things.
//providing this require statement at the top is considered as a good practice also a industry standard.
const app = require("./app.js");

const { PORT } = process.env; //Destructuring the PORT from the process.env.PORT, we can directly use process.env.PORT as well.

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
