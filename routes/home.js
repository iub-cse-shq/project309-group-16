const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const Product = require('../models/Product');


router.get("/", authenticateUser, async (req, res) => {
    console.log(req.session.user.type);
    if (req.session.user.type == "customer") {
        console.log("reached user homepage");
        try{
            const products = await Product.find({});
            console.log(products);
            res.render("home", { user: req.session.user,products: products} );
        }catch (err) {
            res.json({message : err});
        };
    }

    if (req.session.user.type == "admin") {
        console.log("reached Admin homepage");
        res.render("home_admin", { user: req.session.user });
    }
    //console.log(req.session);
    //res.render("home", { user: req.session.user });
  });


module.exports = router;