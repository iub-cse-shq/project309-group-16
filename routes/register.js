const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
  res.render("register");
});


router.post("/", async (req, res) => {
  console.log("Registration page");
  console.log(req.body);
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      password: hashedPassword,
    };

    const newUser = new User({...user}); // stores locally
    const savedUser = await newUser.save(); // saves to the database and returns what has been saved
    console.log(savedUser);
    res.send("registered account!");
//    res.status(200).json(savedUser);

} catch (err) {
    res.status(500);
    console.log(err); 
    res.send(err);
  }
});


module.exports = router;
