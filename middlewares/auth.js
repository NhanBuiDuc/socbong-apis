const { sendSuccessResponse, sendErrorResponse } = require("../response");
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/auth/login");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // res.redirect("/");
    const currentUser = req.user;
    sendSuccessResponse(res, currentUser, "Authenticated User");
  } else {
    next();
  }
}
module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
