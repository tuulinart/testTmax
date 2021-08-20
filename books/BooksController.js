const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const Book = require("./Book");



router.get("/books", (req, res) => {
    Book.findAll().then(books =>{
    res.render("index", {books: books})
    });
})


router.get("/books/new", (req, res) => {
    res.render("books/newBook");
})

router.post("/upload", multer(multerConfig).single("file") , async (req,res) => {
    
    var title = req.body.title;
    if(title  != undefined) {
        Book.create({
            title: title,
            img: req.file.originalname,
            author: req.body.author,
            key: req.file.filename,})
            .then(() => {
                res.redirect("/");
            })
        
    } else {
        res.redirect("/books/new")
    }
    

    
    
})

module.exports = router;