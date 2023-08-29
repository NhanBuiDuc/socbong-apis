const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Set up authentication strategy when initialize the server
function initialize(passport, getAccountByEmail, getAccountById) {
  // Called every time authentication happen
  // Done return (error, founded_account, message)
  const authenticateAccount = async (email, password, done) => {
    const account = getAccountByEmail(email);
    if (account == null) {
      return done(null, false, { message: "No account with that email" });
    }
    try {
      if (await bcrypt.compare(password, account.password)) {
        return done(null, account);
      } else {
        return done(null, false, { message: "Password incorrect " });
      }
    } catch (e) {
      return done(e);
    }
  };
  // Custom database checker to passport.use()
  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateAccount)
  );
  // When a user is authenticated and the serializeUser function is called,
  // it typically takes the user's account object and extracts a unique identifier (often the user's ID) from it.
  // This unique identifier is then stored in the session.
  // This step essentially prepares the user's data to be stored in the session.

  // When serialize, Store the id in the session, that means all data in session are now ids
  passport.serializeUser((account, done) => done(null, account.id));

  // When a user makes a subsequent request with a session cookie, Passport's deserializeUser function is called.
  // It takes the unique identifier (e.g., user's ID) stored in the session and uses it to retrieve the
  // full user data from your database or data source.

  // When deserialize, get
  passport.deserializeUser((id, done) => {
    const account = getAccountById(id); // Retrieve user's account using the stored 'id'
    return done(null, account); // Pass the account object to the callback
  });
}

module.exports = initialize;
