const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    // check for missing fields
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExits = await User.findOne({ email});

    if (!doesUserExits) {
      res.send("Invalid username or password");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
      res.send("invalid useranme or password");
      return;
    }
    
    // else user logged in
    req.session.user = {
      _id: doesUserExits._id,
      email: doesUserExits.email,
      type: doesUserExits.type,
    };
    res.redirect("/home");
  })

module.exports = router;
