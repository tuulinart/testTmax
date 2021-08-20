const express = require("express");
const router = express.Router();


router.get("/books", (req, res) => {
    res.send("ROTA DE LIVROS")
})


router.get("/books/new", (req, res) => {
    res.send("Rota para publicar livros")
})



module.exports = router;