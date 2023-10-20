const { Article } = require("../models");

async function userLoginAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
      if (req.user.role.code >= 200) {
       return next(); 
      }
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
}

module.exports = userLoginAutenticated;
