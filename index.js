const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const session = require("express-session");
const connection = require("./database/connection")
const BooksController = require("./books/BooksController")
const ReservesController = require("./reserves/ReservesController")
const UsersController = require("./users/UsersController")
const Book = require("./books/Book");
const User = require("./users/User");
const Reserve = require("./reserves/Reserve");


//View engine
app.set("view engine", "ejs");


//Sessions
app.use(session({
    secret: "secret",
    //30000= 30 seg / 1000 = 1s seg.
    cookie: { maxAge: 30000 }

}))



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


//Routes

//Session

app.get("/session", (req, res) => {
});

app.get("/leitura", (req, res) => {

});


//Books
app.use("/", BooksController)

//Reserves
app.use("/", ReservesController)

//Users
//Reserves
app.use("/", UsersController)



app.get("/", (req, res) => {
    res.render("./users/login");
})


app.listen(8080, () => {
    console.log("Server is connected");
})