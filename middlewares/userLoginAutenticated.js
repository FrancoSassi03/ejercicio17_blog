const { Article } = require("../models");

async function userLoginAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const article = await Article.findByPk(req.params.id);
    if (article.userId === req.user.id) {
      return next();
    }
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
}

module.exports = userLoginAutenticated;
