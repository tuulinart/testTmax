const Sequelize = require("sequelize");
const connection = require("../database/connection");


const User = connection.define("Users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },


    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },

})

module.exports = User;