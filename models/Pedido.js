const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Pedido = sequelize.define(
    'Pedido',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // pix ou boleto
        tipo_pedido: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);


module.exports = Pedido;
