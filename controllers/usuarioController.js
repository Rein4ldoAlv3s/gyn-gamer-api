const Usuario = require('../models/Usuario');
const Endereco = require('../models/Endereco');
// Chave secreta para JWT
const SECRET_KEY = 'minha_chave_secreta_super_segura';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Para gerar IDs únicos caso o usuário não envie um


// Retorna todos os usuários
const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: { id: req.params.id },
            include: { model: Endereco, as: 'enderecos' }
        });

        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

        return res.json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

}

const login = async (req, res) => {
    console.log(req.body);
    const { nomeUsuario, password } = req.body;

    const Usuario = await Usuario.findOne({
        where: { nomeUsuario: nomeUsuario }
    });

    if (!Usuario) {
        return res.status(400).json({ message: 'Usuário inválido!' });
    }

    const isValid = await Usuario.validPassword(password);
    console.log(isValid ? "Senha correta!" : "Senha incorreta!");

    if (!isValid) {
        return res.status(400).json({ message: 'Senha inválida!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ nomeUsuario: Usuario.nomeUsuario }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
}

const register = async (req, res) => {
    try {
        const {
            nomeUsuario,
            password,
            nomeReal,
            telefone,
            genero,
            dto,
            email
        } = req.body;

        const isUsuarioExist = await Usuario.findOne({
            where: { nomeUsuario: nomeUsuario }
        });

        if (isUsuarioExist) {
            return res.status(400).json({ message: 'Esse Usuário já existe! Informe outro nome' });
        }

        console.log("------" + nomeUsuario);

        const newUsuario = await Usuario.create({
            nomeUsuario,
            password,
            nomeReal,
            telefone,
            genero,
            dto,
            email
        });



        res.status(201).json(newUsuario);

    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
}




module.exports = {
    getAllUsuarios,
    getUsuarioById,
    login,
    register
};
