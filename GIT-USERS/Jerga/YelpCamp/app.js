var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  seedDB = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  authRoutes = require("./routes/index"),
  testRoutes = require("./routes/test"),
  weatherRoutes = require("./routes/weather");

//MODULE
var weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

//seedDB();
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

//mongoose.connect(process.env.DATABASEURL); // database connnect
//mongoose.connect("mongodb://filip:samsung2580@ds013619.mlab.com:13619/yelpcamp");
app.use(bodyParser.urlencoded({ extended: true })); // use od body parser to get values from get req
app.set("view engine", "ejs"); // not need use postfix
app.use(express.static(__dirname + "/public")); //locate public and use css
app.use(methodOverride("_method")); // to override POST method
app.use(flash());
//PASSPORT CONFIG

app.use(
  require("express-session")({
    // to hash password and use of sessions for login
    secret: "gandalf is the best",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // relateon passport-local-mongoose in user.js model

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  //to get logged user info on every page, template
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", testRoutes);
app.use("/weather", weatherRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("The YelpCamp server has started");
});
