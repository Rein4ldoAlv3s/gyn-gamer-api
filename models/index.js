const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Importa a conexão

const Usuario = require('./User');
const Endereco = require('./Endereco');

// Definição das associações
Usuario.hasMany(Endereco, { foreignKey: 'usuarioId', as: 'enderecos' });
Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

const db = {
    sequelize,
    Usuario,
    Endereco
};

module.exports = db;
