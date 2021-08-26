const express = require("express");
const app = express;
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const directorAuth = require("../middlewares/directorAuth");



router.get("/users", directorAuth, (req, res) => {
    var name = req.session.user.name;
    User.findAll().then(users => {
        res.render("./users/getUsers", { users: users, name })
    });
})


router.get("/login", (req, res) => {

    if (req.session.user != undefined) {
        res.redirect("/books")

    } else {

        res.render("./users/login")
    }


})

router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var permission = req.body.permission;
    var name = req.body.name;

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    permission: user.permission,
                    name: user.name,
                }
                res.redirect("/books")
            } else {
                res.redirect("/login")
            }


        } else {
            res.redirect("/login")
        }
    })

})

router.get("/users/edit/:id", directorAuth, (req, res) => {
    var id = req.params.id;
    var name = req.session.user.name;
    if (isNaN(id)) {
        res.redirect("/users/userEdit")
    }
    User.findByPk(id).then(user => {
        if (user != undefined) {
            res.render("users/userEdit", { user: user, name });
        } else {
            res.redirect("/users");
        }
    })
})

router.post("/users/edit", (req, res) => {
    var id = req.body.id;
    User.update({
        name: req.body.name,
        email: req.body.email,
        permission: req.body.permission,
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/users")
    })


})


router.post("/users/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {

        if (req.session.user.id == id) {
            res.redirect("/logout")
        }

        if (!isNaN(id)) {

            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/users")
            })

        } else {
            res.redirect("/users")
        }
    } else {
        res.redirect("/users")
    }
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
                res.redirect("/users");
            }).catch((err) => {
                res.send(err);
            })

        } else {
            res.send(`O email ${req.body.email} já está cadastro`);
        }
    })
})

router.get("/user/edit", (req, res) => {
    var id = req.session.user.id;
    var name = req.session.user.name;
    User.findOne({
        where: { id: id }
    }).then(user => {
        if (user != undefined) {
            res.render("users/userPage", { user: user, name });
        } else {
            res.redirect("/login");
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/login")
})



module.exports = router;