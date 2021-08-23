const express = require("express");
const router = express.Router();
const Reserve = require("./Reserve")
const auth = require("../middlewares/auht");

router.get("/reserves", auth, (req, res) => {
    Reserve.findAll().then(reserves => {
        res.render("reserves/myReserves", { reserves: reserves })
    });
})


module.exports = router;