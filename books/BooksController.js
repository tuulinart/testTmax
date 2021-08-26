const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const Book = require("./Book");
const auth = require("../middlewares/auht");
const directorAuth = require("../middlewares/directorAuth");


router.get("/books", auth, (req, res) => {
    var name = req.session.user.name;
    Book.findAll().then(books => {
        res.render("index", { books: books, name })
    });
})

router.get("/books/list", directorAuth, (req, res) => {
    var name = req.session.user.name;
    Book.findAll().then(books => {
        res.render("books/bookList", { books: books, name })
    });
})

router.get("/books/edit/:id", directorAuth, (req, res) => {
    var id = req.params.id;
    var name = req.session.user.name;
    if (isNaN(id)) {
        res.redirect("/books/list")
    }
    Book.findByPk(id).then(book => {
        if (book != undefined) {
            res.render("books/bookEdit", { book: book, name });
        } else {
            res.redirect("/books");
        }
    })
})

router.post("/books/edit", multer(multerConfig).single("bookFile"), (req, res) => {
    var id = req.body.id;
    Book.update({
        title: req.body.title,
        bookFile: req.file.filename,
        author: req.body.author,
        description: req.body.description,
        permission: req.body.permission,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/books/list")
    })


})


router.post("/books/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {

        if (!isNaN(id)) {

            Book.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/books/list")
            })

        } else {
            res.redirect("/books/list")
        }
    } else {
        res.redirect("/books/list")
    }
})


router.get("/books/new", auth, (req, res) => {
    var name = req.session.user.name;
    res.render("books/newBook", { name });
})

router.post("/upload", multer(multerConfig).single("bookFile"), (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Book.create({
            title: title,
            bookFile: req.file.originalname,
            author: req.body.author,
            key: req.file.filename,
            permission: req.body.permission,
            description: req.body.description
        })
            .then(() => {
                res.redirect("/books");
            })

    } else {
        res.redirect("/books/new")
    }
})
router.get("/books/:id", (req, res) => {
    var id = req.params.id;
    var name = req.session.user.name;
    Book.findOne({
        where: { id: id }
    }).then(book => {
        var permissionBook = book.permission;
        var permissionUser = req.session.user.permission;
        var userId = req.session.user.id;
        switch (permissionUser) {
            case "Diretor":
                console.log(permissionUser)
                console.log(permissionBook)
                console.log(userId)
                res.render("books/bookPage", { book: book, userId, name });
                break;
            case "Professor":
                if (permissionBook === "Estudante") {
                    res.render("books/bookPage", { book: book, userId, name });
                    console.log(permissionUser)
                    console.log(permissionBook)
                    console.log(userId)
                } else if (permissionBook === "Professor") {
                    res.render("books/bookPage", { book: book, userId, name });
                    console.log(permissionUser)
                    console.log(permissionBook)
                    console.log(userId)
                } else {
                    res.redirect("/books");
                }
                break;
            case "Estudante":
                if (permissionBook === permissionUser) {
                    res.render("books/bookPage", { book: book, userId, name });
                } else {
                    res.redirect("/books");
                }
            default:
                res.redirect("/books");
        }
    })
})

module.exports = router;