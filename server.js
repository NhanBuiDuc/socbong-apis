// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
accounts = [];
// Import required libraries and modules
const express = require("express"); // Express web framework
const bcrypt = require("bcrypt"); // Library for password hashing
const app = express(); // Initialize Express app
const passport = require("passport"); // Authentication library
const flash = require("express-flash"); // Flash messages for notifications
const session = require("express-session"); // Session management middleware
const initializePassport = require("./passport-config.js"); // Custom passport configuration
const methodOverride = require("method-override");
app.set("view-engine", "ejs"); // Set the view engine to EJS

app.use(express.json()); // Parse JSON request bodies
app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
// Set up the middleware for flash messages.
// Flash messages are used to provide short-lived notifications to users, such as success or error messages.
// They are stored in the session and can be displayed on the next page after an action.
app.use(flash()); // Set up flash messages

// Set up the session middleware.
// The 'secret' is used to sign the session ID cookie, enhancing security.
// 'resave: false' ensures that the session is not saved if unmodified, improving performance.
// 'saveUninitialized: false' prevents the creation of sessions until something is stored, which helps reduce unnecessary empty sessions.
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret used to sign session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
  })
);

// Initialize Passport middleware.
// Passport is a library for authentication and user management.
// 'passport.initialize()' initializes Passport and adds its methods and properties to the request object.
app.use(passport.initialize()); // Initialize Passport

// Use persistent login sessions.
// This middleware enables persistent login sessions using Passport.
// Passport uses the session middleware to deserialize the user object from the session,
// allowing access to user information through 'req.user' in subsequent requests.
app.use(passport.session()); // Use persistent login sessions

// Initialize Passport with custom function
initializePassport(
  passport,
  (email) => accounts.find((account) => account.email === email),
  (id) => accounts.find((account) => account.id === id)
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    //push to the database
    const account = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    accounts.push(account);
    // res.status(201).send();
    res.redirect("/login");
  } catch {
    // res.status(500).send();
    res.redirect("/register");
  }
  console.log(accounts);
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    next();
  }
}
// Take note that req.user is the current user of the session
app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
app.listen(3000);
