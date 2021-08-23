const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Book = require("../books/Book");
const User = require("../users/User");


const Reserve = connection.define("reserves", {
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }

})

Book.hasMany(Reserve); //Um livro pode ter várias reservas.
Reserve.belongsTo(Book); //Uma reserva contém somente um livro.
User.hasMany(Reserve); // Um usúario pode ter diversas reservas.

//Reserve.sync({ force: false });

module.exports = Reserve;