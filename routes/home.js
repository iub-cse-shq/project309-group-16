const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");


router.get("/", authenticateUser, (req, res) => {
    console.log(req.session.user.type);
    if (req.session.user.type == "customer") {
        console.log("reached user homepage");
        res.render("home", { user: req.session.user });
    }

    if (req.session.user.type == "admin") {
        console.log("reached Admin homepage");
        res.render("home_admin", { user: req.session.user });
    }
    //console.log(req.session);
    //res.render("home", { user: req.session.user });
  });


module.exports = router;