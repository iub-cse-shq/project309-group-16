const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const cookieSession = require("cookie-session");

require('dotenv/config')

const authenticateUser = require("./middlewares/authenticateUser");

// cookie session
app.use(
  cookieSession({
    keys: ["abcdefghijklmnopqrstuvwxyz"],
  })
);

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({extend:true}));
app.use(bodyParser.json({extend:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//Import Routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const viewProductRoute = require('./routes/viewProduct');
const createProductRoute = require('./routes/createProduct');
const registerRoute = require('./routes/register');
const logoutRoute = require('./routes/logout');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');

app.use('/register', registerRoute);
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/viewProduct', viewProductRoute);
app.use('/createProduct', createProductRoute);
app.use('/logout', logoutRoute);
app.use('/home', homeRoute);
app.use('/cart', cartRoute);

//ROUTES
app.get('/', (req,res) => {
    //res.send('We are on home');
    res.render("index");
});

//How to start listening
app.listen(3000, async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
  }
  console.log("Successfully started server");
  console.log(process.env.DB_CONNECTION);
});