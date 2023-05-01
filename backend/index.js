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

/*
-Need to tell express that we are serving static files in a specific folder.
-This will allow the Front-End to access the Images without hitting a 404 (Not Found) error
*/
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/uploads"));

app.use(router);

const port = config.appPort;

app.listen(port, () => {
  console.log(`Bookkeeping app listening on port ${port}`);
});

//create a server for Socket.IO to use
// const server = http.createServer(app);
//use socket.io to manage the server
// const SocketServer = require("./socket");
// SocketServer(server);

//All traffic is routed to Socket.IO
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
