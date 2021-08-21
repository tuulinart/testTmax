const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");


router.get("/users", (req, res) => {
    User.findAll().then(users => {
        res.render("./users/getUsers", { users: users })
    });
})


router.get("/login", (req, res) => {
    res.render("./users/login")
})


router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                }
                res.json(req.session.user);
            } else {
                res.redirect("/login")
            }


        } else {
            res.redirect("/login")
        }
    })

})




router.get("/users/new", (req, res) => {
    res.render("./users/signup")
})

router.post("/users/create", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var permission = req.body.permission;

    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash,
                permission: permission
            }).then(() => {
                res.redirect("/books");
            }).catch((err) => {
                res.send(err);
            })

        } else {
            res.redirect("/users/new");
        }
    })
})


module.exports = router;