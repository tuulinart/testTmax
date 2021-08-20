const Sequelize = require("sequelize");
const connection = require("../database/connection");


const Book = connection.define("Books", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    upload: {
        type: Sequelize.STRING,
        allowNull: false
    },


    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },




})

module.exports = Book;