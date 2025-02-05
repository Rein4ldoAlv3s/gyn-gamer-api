const Usuario = require('./Usuario');
const Endereco = require('./Endereco');

// Criando a relação 1:N (um usuário tem vários endereços)
Usuario.hasMany(Endereco, { foreignKey: 'usuarioId', as: 'enderecos' });
Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = { Usuario, Endereco };
