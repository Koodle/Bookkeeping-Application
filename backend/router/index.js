const router = require("express").Router();

router.post("/home", (req, res) => {
  return res.send("Home Screen");
});

router.use("/", require("./auth"));

router.use("/transactions", require("./transactions"));

// router.use("/reports/pdf", require("./pdf"));

module.exports = router;
