const express = require("express");
const router = express.Router();
const Reserve = require("./Reserve")
const auth = require("../middlewares/auht");
const Book = require("../books/Book");
const User = require("../users/User");
var fs = require('fs');
const http = require('http');
var path = require('path');
var mime = require("mime")

router.get("/reserves", auth, (req, res) => {
    var name = req.session.user.name;
    Reserve.findAll({
        include: [{ model: Book }]
    }).then(reserves => {
        res.render("reserves/myReserves", { reserves: reserves, name })
    });
})

router.get("/reserves/new", auth, (req, res) => {
    var name = req.session.user.name;
    res.render("reserves/newReserve", { name })
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
    var name = req.session.user.name;
    if (isNaN(id)) {
        res.redirect("/reserves")
    }
    Reserve.findByPk(id).then(reserve => {
        if (reserve != undefined) {
            res.render("reserves/reservesEdit", { reserve: reserve, name });
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

/* router.get("/reserve/dowload", (req, res) => {
   var file = `${__dirname}/src/uploads/658b530bb8991275a21cef93ef9c5bff-1 - Manual Projeto PCI`;

   var filename = path.basename(file);
   var mimetype = mime.getType(file);

   res.setHeader('Content-disposition', 'attachment; filename=' + filename);
   res.setHeader('Content-type', mimetype);

   var readStream = fs.createReadStream(filename);
   readStream.on('open', function () {
       readStream.pipe(res);
   });
   readStream.on('error', function (err) {
       res.end(err);
   }); 
 
})  */


module.exports = router;