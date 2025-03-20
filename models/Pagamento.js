const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Pagamento = sequelize.define(
    'Pagamento',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // pix ou boleto
        tipo_pagamento: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);


module.exports = Pagamento;
