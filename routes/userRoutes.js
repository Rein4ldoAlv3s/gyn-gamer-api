const express = require('express');
const router = express.Router();
const { getAllUsers,
    login,
    register } = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/list-all', getAllUsers);

// Rota para cadastrar usuario
router.post('/register', register);

// Rota para criar um novo usuário
router.post('/login', login);

module.exports = router;
