const express = require("express");
const router = express.Router();

// Redirect home page to /catalog
router.get("/", function (req, res) {
  res.redirect("/blog");
});

module.exports = router;
