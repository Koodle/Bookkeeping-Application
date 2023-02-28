const router = require("express").Router();
const {
  index,
  create,
  deleteTransaction,
} = require("../controllers/transactionsController");
//Middleware to check the JWT
//TODO: authentication
const { auth } = require("../middleware/auth");

/*Best practice for RESTful API design is that path params are used to identify a specific resource or resources, while query parameters are used to sort/filter those resources*/

//the second param is an array of middlewares to be run
router.get("/", [auth], index);
router.post("/create", [auth], create);
router.delete("/:id", [auth], deleteTransaction); //uses path params
// router.get("/ledgers", [auth], TODO:)

module.exports = router;
