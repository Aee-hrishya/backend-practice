const jwt = require("jsonwebtoken");

//Our custom middleware to authorize users and protect routes.
const auth = (req, res, next) => {
  //The request token comes up in various places like in Athorization in header, in cookies, in request body so we grab it. If it comes in the header Authorization is actually begins with "Bearer " so we replace it with nothing as we just want the token.

  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", ""); //We put the authorization part at the end so that we don't face any errors.

  //If token is not present then return this message.
  if (!token) {
    return res.status(403).send("Token is missing.");
  }

  try {
    //decode the token and verify whether it has the same secret as the one we provided.
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);
  } catch (error) {
    //Else send error message.
    return res.status(401).send("Invalid token!!");
  }

  return next(); //We need to use next() it is how we write the middlewares.
};

module.exports = auth;
