function directorAuth(req, res, next) {

    if (req.session.user.permission == "Diretor") {
        next();
    } else {
        res.redirect("/books");
    }
}

module.exports = directorAuth;