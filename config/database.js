const { Sequelize } = require('sequelize');

// Configura a conexão com o banco de dados
const sequelize = new Sequelize('gyn_gamer_api', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
