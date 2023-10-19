const { Article } = require("../models");

async function userLoginAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const article = await Article.findByPk(req.params.id);
    if (article.userId === req.user.id) {
      if (req.user.role.code >= 200) {
       return next(); 
      }
      res.redirect("/");
    }
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
}

module.exports = userLoginAutenticated;
