const express = require("express");
const router = express.Router();


router.get("/reserve", (req, res) => {
    res.render("reserve/reserve")
})


module.exports = router;