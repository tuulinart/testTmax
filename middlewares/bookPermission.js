function bookPermission(req, res, next) {

    if (req.session.user.permission == "Diretor") {
        next();
        /* if (req.book.permission == "Professor" && "Estudante" && req.session.user.permission == "Professor") {
            next();
        }
        if (req.session.user.permission == "Estudante" && req.book.permission == "Estudante") {
            next();
        } */
    } else {
        res.redirect("/books");
    }
}

module.exports = bookPermission;