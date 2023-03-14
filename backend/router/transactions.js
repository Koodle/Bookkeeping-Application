const router = require("express").Router();
const {
  index,
  create,
  deleteTransactions,
  editTransactions,
} = require("../controllers/transactionsController");
//Middleware to check the JWT
//TODO: authentication
const { auth } = require("../middleware/auth");

/*Best practice for RESTful API design is that path params are used to identify a specific resource or resources, while query parameters are used to sort/filter those resources*/

//the second param is an array of middlewares to be run
router.get("/", [auth], index);
router.post("/create", [auth], create);
// router.patch("/edit/:id", [auth], editTransactions);
// router.delete("/delete/:id", [auth], deleteTransactions); //uses path params
router.patch("/edit", [auth], editTransactions);
router.delete("/delete", [auth], deleteTransactions); //uses path params
// router.get("/ledgers", [auth], TODO:)

module.exports = router;
