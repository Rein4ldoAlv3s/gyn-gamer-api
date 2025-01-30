const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User',
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
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                },
            },
        }
    );

    // Método para verificar senha
    User.prototype.validPassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};
