const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require("bcryptjs");
const User = require('./User');

const Endereco = sequelize.define(
    'Endereco',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeDestinatario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logradouro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoEndereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

User.hasMany(Endereco, { foreignKey: "userId" });
Endereco.belongsTo(User, { foreignKey: "userId" });

module.exports = Endereco;
