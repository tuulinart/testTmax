function directorAuth(req, res, next) {

    if (req.session.user != undefined) {
        if (req.session.user.permission == "Diretor") {
            next();
        } else {
            res.redirect("/books");
        }
    } else {
        res.redirect("/login");
    }
    
}

module.exports = directorAuth;