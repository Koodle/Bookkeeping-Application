const express = require("express");
const config = require("./config/app");
const router = require("./router/index"); //http://expressjs.com/en/guide/using-middleware.html#middleware.router
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//create server
const http = require("http");

app.use(bodyParser.urlencoded({ extended: true })); //to upload images //middleware for parsing bodies from URL
app.use(bodyParser.json()); //bodyParser.json returns middleware that only parses json
app.use(cors()); //to prevent blocking the front end application. when it tries to make a http request to here


app.use(router);

const port = config.appPort;

app.listen(port, () => {
  console.log(`Bookkeeping app listening on port ${port}`);
});
