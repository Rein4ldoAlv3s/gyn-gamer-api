const User = require('../models/User');
// Chave secreta para JWT
const SECRET_KEY = 'minha_chave_secreta_super_segura';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Para gerar IDs únicos caso o usuário não envie um


// Retorna todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    console.log(req.body);
    const { nomeUsuario, password } = req.body;

    const user = await User.findOne({
        where: { nomeUsuario: nomeUsuario }
    });
    console.log("--------------------");
    console.log(user);
    console.log(password);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Verificar senha
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password === user.dataValues.password) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ nomeUsuario: user.nomeUsuario }, SECRET_KEY, { expiresIn: '1h' });
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

        // // Verificar se o usuário já existe
        // if (User.find(user => user.nomeUsuario === nomeUsuario)) {
        //     return res.status(400).json({ message: 'Usuário já existe!' });
        // }

        // Hash da senha

        const newUser = await User.create({
            nomeUsuario,
            password,
            nomeReal,
            telefone,
            genero,
            dto,
            email
        });
        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
    }
}




module.exports = {
    getAllUsers,
    login,
    register
};
