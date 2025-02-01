const express = require('express');
const router = express.Router();
const { getAllUsers,
    login,
    register } = require('../controllers/userController');

// Rota para obter todos os enderecos
router.get('/list-all', getAllEnderecos);

// Rota para obter um endereco
router.get('/:id', getEnderecoById);

// Rota para cadastrar endereco
router.post('/register', register);

// Rota para deletar endereco
router.delete('/delete/:id', delete);



module.exports = router;
