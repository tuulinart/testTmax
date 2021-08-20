const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const connection = require("./database/connection")
const BooksController = require("./books/BooksController")
const ReserveController = require("./reserves/ReservesController")
const Book = require("./books/Book");
const User = require("./users/User");
const Reserve = require("./reserves/Reserve");


//View engine
app.set("view engine", "ejs");

//Static
app.use(express.static("public"));


//Body Parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Morgan
app.use(morgan("dev"));



//Database
connection
    .authenticate()
    .then(() => {
        console.log("successfully connected")
    })
    .catch((error) => {
        console.log(error);
    })

//Books
app.use("/", BooksController)

//Reserves
app.use("/", ReserveController)



app.get("/", (req, res) => {
    res.render("index");
})


app.listen(8080, () => {
    console.log("Server is connected");
})