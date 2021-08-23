const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const Book = require("./Book");
const auth = require("../middlewares/auht");
const bookAuth = require("../middlewares/bookPermission");
const directorAuth = require("../middlewares/directorAuth");
const fs = require("fs");


router.get("/books", auth, (req, res) => {
    Book.findAll().then(books => {
        res.render("index", { books: books })
    });
})

router.get("/books/list", directorAuth, (req, res) => {
    Book.findAll().then(books => {
        res.render("books/bookList", { books: books })
    });
})

router.get("/books/edit/:id", directorAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/books/list")
    }
    Book.findByPk(id).then(book => {
        if (book != undefined) {
            res.render("books/bookEdit", { book: book });
        } else {
            res.redirect("/books");
        }
    })
})

router.post("/books/edit", multer(multerConfig).single("file"), (req, res) => {
    var id = req.body.id;
    Book.update({
        title: req.body.title,
        img: req.file.filename,
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
    res.render("books/newBook");
})

router.post("/upload", multer(multerConfig).single("file"), (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Book.create({
            title: title,
            img: req.file.originalname,
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

router.get("/books/:id", bookAuth, (req, res) => {
    var id = req.params.id;
    var url = `../src/uploads/${req.body.file}`;
    Book.findOne({
        where: { id: id }
    }).then(book => {
        if (book != undefined) {
            res.render("books/bookPage", { book: book });
        } else {
            res.redirect("/books");
        }
    })
})

module.exports = router;