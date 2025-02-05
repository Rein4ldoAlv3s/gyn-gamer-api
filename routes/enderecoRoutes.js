const express = require('express');
const router = express.Router();
const { getAllEnderecos, register, getEnderecoById, deleteEndereco, editarEndereco } = require('../controllers/enderecoController');

// obter todos os enderecos
router.get('/list-all', getAllEnderecos);

// obter um endereco
router.get('/:id', getEnderecoById);

// cadastrar endereco
router.post('/register', register);

//deletar endereco
router.delete('/delete/:id', deleteEndereco);

//editar endereco
router.put('/edit/:id', editarEndereco);


module.exports = router;
