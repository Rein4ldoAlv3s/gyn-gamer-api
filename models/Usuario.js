const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
    'Usuario',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeReal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomeUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async () => {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            },
        },
    }
    , {
        tableName: 'usuarios',  // Define explicitamente o nome da tabela
        timestamps: false  // Se não quiser os campos createdAt e updatedAt
    });

// Método para validar senha
Usuario.prototype.validPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = Usuario;
