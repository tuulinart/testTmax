const Sequelize = require("sequelize");

//Configurações de conexão. Relavativas.
const connection = new Sequelize("tmaxtest", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
});


module.exports = connection;