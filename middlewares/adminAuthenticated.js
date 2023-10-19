function adminAuthenticaded (req, res, next){
    if (req.isAuthenticated()) {
        if (req.user.role.code >= 300) {
            return next(); 
           }
           res.redirect("/admin");
        } else {
        res.redirect("/login");
        }
};

module.exports = adminAuthenticaded;