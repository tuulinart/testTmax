const express = require("express");
const router = express.Router();
const Reserve = require("./Reserve")
const auth = require("../middlewares/auht");
const Book = require("../books/Book");
const User = require("../users/User");
var fs = require('fs');
const http = require('http');

router.get("/reserves", auth, (req, res) => {

    Reserve.findAll({
    include: [{model: Book}]
    }).then(reserves => {
        res.render("reserves/myReserves", { reserves: reserves })
    });
})

router.get("/reserves/new",auth, (req, res)  => {
    res.render("reserves/newReserve")
})



router.post("/getReserve", auth, (req, res) => {
    var book = req.body.bookId;
    Reserve.findOne({ where: { bookId: book } }).then(reserve => {
        if (reserve == undefined) {
            Reserve.create({
                bookId: book,
                userId: req.body.userId,
            })
                .then(() => {
                    res.redirect("/reserves");

                })
        } else {
            res.redirect("/reserves");
        }
    })
})
/*router.get("/dowload", (req, res) => {
    var url = `../src/uploads/${req.body.book.key}`;
    res.download(url);
})*/


router.get("/reserves/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/reserves")
    }
    Reserve.findByPk(id).then(reserve => {
        if (reserve != undefined) {
            res.render("reserves/reservesEdit", { reserve: reserve });
        } else {
            res.redirect("/books");
        }
    })
})

router.post("/reserves/edit", (req, res) => {
    var id = req.body.id;
    Reserve.update({
        userId: req.body.userId,
        bookId: req.body.bookId,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/books/list")
    })


})

router.post("/reserves/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {

        if (!isNaN(id)) {

            Reserve.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/reserves")
            })

        } else {
            res.redirect("/reserves")
        }
    } else {
        res.redirect("/reserves")
    }
})


module.exports = router;