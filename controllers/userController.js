const User = require('../models/User');

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
};
