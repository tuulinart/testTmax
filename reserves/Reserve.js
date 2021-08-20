const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Book = require("../books/Book");
const User = require("../users/User");


const Reserve = connection.define("reserves", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },


})

Reserve.belongsTo(Book);
Reserve.belongsTo(User);


//Reserve.sync({force: true});

module.exports = Reserve;