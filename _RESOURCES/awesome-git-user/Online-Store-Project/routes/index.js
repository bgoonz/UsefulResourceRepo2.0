var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");
var Product = require("../models/product");
var Order = require("../models/order");

/* GET shop home page. */
router.get("/", function (req, res, next) {
  var successMsg = req.flash("success")[0];
  Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for (i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/index", {
      title: "Top Shelf Whisky",
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg,
    });
  });
});

router.get("/shop/:region", (req, res, next) => {
  var type = req.params.region;
  console.log(type);
  Product.find({ category: type }, (err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for (i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    if (docs.length === 0) {
      return res.render("shop/" + type, {
        title: "No " + type + " whiskies in stock at this time",
      });
    }
    res.render("shop/" + type, { title: type, products: productChunks });
  });
});

router.get("/cart/:id", (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/reduce/:id", (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reducer(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/remove/:id", (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remover(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/shopping-cart", (req, res, next) => {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/checkout", isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  res.render("shop/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noErrors: !errMsg,
  });
});

router.post("/checkout", isLoggedIn, (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_hVXfQfthOtN7RbencDLBbSb9");

  stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: "jpy",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Charge for jenny.rosen@example.com",
    },
    function (err, charge) {
      // asynchronously called
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }
      var newOrder = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id,
      });
      //order.markModified('user');
      console.log(newOrder);
      newOrder.save((err, result) => {
        if (err) {
          return console.error(err);
        }
        console.log(result);
        req.flash("success", "Your purchase was successful!");
        req.session.cart = null;
        res.redirect("/");
      });
    }
  );
});

router.get("/home", (req, res, next) => {
  res.render("landing/home", {
    title: "Top Shelf Whisky",
    layout: "homelayout.hbs",
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect("/user/signin");
}
