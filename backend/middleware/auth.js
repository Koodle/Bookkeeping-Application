const jwt = require("jsonwebtoken");
const config = require("../config/app");

//Create auth Middleware to check if any token was passed with the /users/update request & then check if token is valid

exports.auth = (req, res, next) => {
  //check the requests header to find the JWT Bearer Token
  const authHeader = req.headers["authorization"];

  //if authHeader is not null -> grab the Bearer Token
  // const token = authHeader && authHeader.split(" ")[1];
  const token = authHeader.replace(/['"]+/g, "");

  //check for missing token
  if (!token) {
    return res.status(401).json({ error: "Missing Token" });
  }

  //use JWT to check the validity of the token
  jwt.verify(token, config.appKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    /*
      set the decoded user as a key in the Request,
      now When we call the next middleware (the controller) with next(),
      it will have access to the User's info
      */
    req.user = user;
  });

  // call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  next();
};
