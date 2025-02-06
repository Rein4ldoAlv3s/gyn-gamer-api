const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require("bcryptjs");

const Endereco = sequelize.define('Endereco',
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
        usuarioId: {  // Chave estrangeira para Usuario
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Nome da tabela no banco
                key: 'id'
            }
        }
    }
    , {
        tableName: 'enderecos',  // Define explicitamente o nome da tabela
        timestamps: false  // Se não quiser os campos createdAt e updatedAt
    });

module.exports = Endereco;
