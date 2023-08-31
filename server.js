// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { getAllAccounts } = require("./database/models/account");

// Import required libraries and modules
const express = require("express"); // Express web framework
const bcrypt = require("bcrypt"); // Library for password hashing
const app = express(); // Initialize Express app
const passport = require("passport"); // Authentication library
const flash = require("express-flash"); // Flash messages for notifications
const session = require("express-session"); // Session management middleware
const initializePassport = require("./passport-config.js"); // Custom passport configuration
const methodOverride = require("method-override");
const authMiddlewares = require("./middlewares/auth");
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

const authRoutes = require("./routes/auth");
// Use the imported route handling logic
app.use("/auth", authRoutes);

// Take note that req.user is the current user of the session
app.get("/", authMiddlewares.checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});
const startServer = async () => {
  try {
    // Fetch accounts data using getAllAccounts
    let accounts = await getAllAccounts();
    console.log("All accounts:", accounts);

    // Initialize Passport with custom function
    initializePassport(
      passport,
      (email) => accounts.find((account) => account.email === email),
      (id) => accounts.find((account) => account.id === id)
    );

    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
// Call the async function to start the server
startServer();
