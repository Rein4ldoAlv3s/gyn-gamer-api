const express = require('express');
const router = express.Router();
const { getAllUsers,
    login,
    register,
    getUserById } = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/', getAllUsers);

// Rota para obter usuario por ID
router.get('/:id', getUserById);

// Rota para cadastrar usuario
router.post('/register', register);

// Rota para criar um novo usuário
router.post('/login', login);

module.exports = router;
