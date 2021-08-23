const Sequelize = require("sequelize");
const connection = require("../database/connection");


const Book = connection.define("books", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    key: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    permission: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bookFile: {
        type: Sequelize.STRING,
        allowNull: false,
    }


})

//Book.sync({ force: false });


module.exports = Book;