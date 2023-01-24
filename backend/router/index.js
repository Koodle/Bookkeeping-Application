const router = require("express").Router();

router.post("/home", (req, res) => {
  return res.send("Home Screen");
});

router.use("/", require("./auth"));

router.use("/transactions", require("./transactions"));

module.exports = router;
