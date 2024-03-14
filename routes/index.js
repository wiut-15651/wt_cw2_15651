const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Recipes Sharing App" })
);

module.exports = router;
