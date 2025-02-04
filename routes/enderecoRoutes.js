const express = require('express');
const router = express.Router();
const { getAllEnderecos, register, getEnderecoById, deleteEndereco } = require('../controllers/enderecoController');

// obter todos os enderecos
router.get('/list-all', getAllEnderecos);

// obter um endereco
router.get('/:id', getEnderecoById);

// cadastrar endereco
router.post('/register', register);

// Rota para deletar endereco
router.delete('/delete/:id', deleteEndereco);



module.exports = router;
