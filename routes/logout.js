const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");

router.get("/", authenticateUser, (req, res) => {
  console.log("Trying to logout");
  req.session.user = null;
  res.redirect("/login");
  });

  module.exports = router;
