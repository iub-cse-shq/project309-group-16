const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
let alert = require("alert");

// Gets back all the posts
router.get("/", async (req, res) => {
  console.log("Reached Cart");
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (err) {
    res.json({ message: err });
  }
});

// submits a post
router.post("/", async (req, res) => {
  console.log(req.body);

  const cart = new Cart({
    title: req.body.title,
    productId: req.body.productId,
    price: req.body.price,
    quantity: req.body.quantity,
    totalPrice: Number(req.body.quantity) * Number(req.body.price),
    user: req.session.user,
  });
  const updatedProduct = await Product.findById(req.body._id);
  if (
    updatedProduct.availQty === 0 ||
    updatedProduct.availQty - Number(req.body.quantity) < 0
  ) {
    console.log("Product has finished.");
    try {
      alert("Dear Customer, we are sorry. Ordered amount more than stock.");
      res.redirect("/home");
    } catch {
      console.log(err);
      res.json({ message: err });
    }
  } else {
    try {
      updatedProduct.availQty =
        updatedProduct.availQty - Number(req.body.quantity);
      await updatedProduct.save();
      const savedCart = await cart.save();
      console.log(savedCart);
      alert(
        `A total of ${cart.quantity} Item : ${
          cart.title
        } has been bought with a cost price of ${
          Number(cart.price) * Number(cart.quantity)
        }`
      );
      res.redirect("/home");
    } catch (err) {
      console.log(err);
      res.json({ message: err });
    }
  }
});

// specific post
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Product.findById(req.params.cartId);
    console.log(cart);
    res.render("cart", {
      cart: cart,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// delete cart
router.delete("/:cartId", async (req, res) => {
  try {
    const removedCart = await Cart.remove({ _id: req.params.cartId });
    res.json(removedCart);
  } catch (err) {
    console.log("error", err);
    res.json({ message: err });
  }
});

//Update cart
router.patch("/:cartId", async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { _id: req.params.cartId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedCart);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
