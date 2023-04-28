const jwt = require("jsonwebtoken");
const config = require("../config/app");

//Create auth Middleware to check if any token was passed with the /users/update request & then check if token is valid

exports.auth = (req, res, next) => {

  //check the requests header to find the JWT Bearer Token
  const authHeader = req.headers["authorization"];
  // console.log("authheader");
  // console.log(authHeader);

  let token = "";

  //if authHeader is not null -> grab the Bearer Token
  // const token = authHeader && authHeader.split(" ")[1];
  if (authHeader[0] == "B") {
    // console.log("with bearer");
    token = authHeader.replace(/['"]+/g, "").slice(7);
  } else {
    // console.log("without bearer");
    token = authHeader.replace(/['"]+/g, "");
  }

  // console.log("token: ");
  // console.log(token);

  //check for missing token
  if (!token) {
    return res.status(401).json({ error: "Missing Token" });
  }

  //use JWT to check the validity of the token
  jwt.verify(token, config.appKey, (err, user) => {
    if (err) {
      console.log("wrong token");
      return res.status(401).json({ error: err });
    }

    /*
      set the decoded user as a key in the Request,
      now When we call the next middleware (the controller) with next(),
      it will have access to the User's info
      */
    req.user = user;
    console.log("user info appended");
  });

  // call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  next();
};
