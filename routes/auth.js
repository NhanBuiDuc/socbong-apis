const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middlewares/auth");

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
  // ... your registration logic
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router; // Export the router object
