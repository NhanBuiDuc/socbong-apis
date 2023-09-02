const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { sendSuccessResponse, sendErrorResponse } = require("../response");
const { insertAccount } = require("../database/queries_models/account");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middlewares/auth");

// router.get("/register", checkNotAuthenticated, (req, res) => {
//   console.log("register");
//   res.render("register.ejs");
// });

// router.get("/login", checkNotAuthenticated, (req, res) => {
//   console.log("login");
//   res.render("login.ejs");
// });

router.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new account record using the data from the request body
    const newAccount = await insertAccount({
      name: req.body.name,
      email: req.body.email,
      branch_id: req.body.branch_id,
      password: hashedPassword,
    });

    // Send a success response
    sendSuccessResponse(res, newAccount, "Account created successfully");
  } catch (error) {
    // Handle any errors here
    console.error("Error creating account:", error);

    // Send an error response
    sendErrorResponse(res, 500, "Error creating account", error.message);
  }
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
