const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Gets back all the products
router.get('/', async (req, res) => {
    try{
        const products = await Product.find({});
        console.log(products);
//        res.json(products);
        res.render("adminProductView", {
            products: products});
// price: products. 
    } catch (err) {
        res.json({message : err});
    };
});

// specific post
router.get('/:productId', async (req, res) =>{
        try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (err) {
        res.json({message: err});
    }
});

// delete post
router.delete('/:productId', async (req, res) => {
    try{
        const removedProduct = await Product.remove({ _id: req.params.productId });
        res.json(removedProduct);
    } catch (err) {
        console.log('error', err);
        res.json({message: err});
    }    
});



module.exports = router;