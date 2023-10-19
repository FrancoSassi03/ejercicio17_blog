function escritorAuthenticaded (req, res, next){
    if (req.isAuthenticated()) {
        if (req.user.role.code >= 200) {
            return next(); 
           }
           res.redirect("/");
        } else {
        res.redirect("/login");
        }
};

module.exports = escritorAuthenticaded;