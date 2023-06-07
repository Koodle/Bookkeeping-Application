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

router.get("/", [auth], index);
router.post("/create", [auth], create);
router.patch("/edit", [auth], editTransactions);
router.delete("/delete", [auth], deleteTransactions);

module.exports = router;
