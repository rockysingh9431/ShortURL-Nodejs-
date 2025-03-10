const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null; //  indicate that the user is not authenticated

  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}
module.exports = { checkForAuthentication, restrictTo };
