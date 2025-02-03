const express = require('express');
const router = express.Router();
const { getAllEnderecos, register, getEnderecoById } = require('../controllers/enderecoController');

// Rota para obter todos os enderecos
router.get('/list-all', getAllEnderecos);

// Rota para obter um endereco
router.get('/:id', getEnderecoById);

// Rota para cadastrar endereco
router.post('/register', register);

// Rota para deletar endereco
// router.delete('/delete/:id', deleteById);



module.exports = router;
