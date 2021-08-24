const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Book = require("../books/Book");
const User = require("../users/User");


const Reserve = connection.define("reserves", {
    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    bookId: {
        type: Sequelize.INTEGER,
        references: {model: "books", key: "id"},
    onDelete: "CASCADE",
    OnUpdate: "CASCADE",
    allowNull: false,
    }
    
})

Book.hasMany(Reserve); //Um livro pode ter várias reservas.


User.hasMany(Reserve); // Um usúario pode ter diversas reservas.

//Reserve.sync({ force: false });

module.exports = Reserve;