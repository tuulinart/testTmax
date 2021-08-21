const Sequelize = require("sequelize");
const connection = require("../database/connection");


const Book = connection.define("Books", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    key: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    permission: {
        type: Sequelize.STRING,
        allowNull: false,
    }


})

//Book.sync({ force: true });


module.exports = Book;