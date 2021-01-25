const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
let alert = require('alert');  
//var multer = require('multer');
//var fs = require('fs');
//var path = require('path');


//var storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        cb(null, 'uploads')
//    },
//    filename: (req, file, cb) => {
//        cb(null, file.fieldname + '-' + Date.now())
//    }
//});
 
//var upload = multer({ storage: storage });



// Gets back all the products
router.get('/', async (req, res) => {
    res.render("createProduct");
});

// submits a post
router.post('/', async (req, res) =>{
    console.log("Create Products");
    console.log(req.body);
    console.log(req.session.user);
    console.log(req.session.user.type);
    const products = new Product({
        title: req.body.title,
        image: req.body.image,
        availQty: req.body.availQty,
        price: req.body.price,
        owner: req.session.user.name
    });
    try{
        alert("Dear Admin, we've added the new product");
        const savedProducts = await products.save();
        res.redirect("/home");
    }  catch(err) {
        res.json({message: err});
    }
});

module.exports = router;