const express = require('express');
const router = express.Router();
const { getAllUsuarios,
    login,
    register,
    getUsuarioById } = require('../controllers/UsuarioController');

// Rota para obter todos os usuários
router.get('/list-all', getAllUsuarios);

// Rota para obter usuario
router.get('/:id', getUsuarioById);

// Rota para cadastrar usuario
router.post('/register', register);

// Rota para criar um novo usuário
router.post('/login', login);

module.exports = router;
