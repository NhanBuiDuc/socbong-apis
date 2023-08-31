const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const middleware = require("../middlewares/auth");

// Authentication
app.get("/register", middleware.checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.get("/login", middleware.checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post("/register", middleware.checkNotAuthenticated, async (req, res) => {
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
  middleware.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
module.exports = router;
