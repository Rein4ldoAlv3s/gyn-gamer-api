const Endereco = require('../models/Endereco');
// Chave secreta para JWT
const SECRET_KEY = 'minha_chave_secreta_super_segura';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Para gerar IDs únicos caso o usuário não envie um


// Retorna todos os usuários
const getAllEnderecos = async (req, res) => {
    try {
        const users = await Endereco.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const getEnderecoById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Endereco.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Endereco não encontrado' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar endereco' });
    }
};

const deleteEndereco = async (req, res) => {
    try {
        const id = req.params.id;

        const endereco = await Endereco.destroy({
            where: { id: id }
        });

        if (endereco === 0) {
            res.status(500).json({ error: 'Nenhum endereco encontrado pra deletar.' });
        } else {
            res.status(200).json(`Usuário com ID ${id} deletado.`);
        }

    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar endereco' });
    }
};

const register = async (req, res) => {
    try {
        // const {
        //     nomeDestinatario,
        //     logradouro,
        //     rua,
        //     estado,
        //     cidade,
        //     tipoEndereco,
        //     cep,
        //     complemento
        // } = req.body;

        const newEndereco = await Endereco.create(req.body);

        res.status(201).json(newEndereco);

    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
    }
}

const editarEndereco = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        const newData = req.body;

        const updatedRows = await Endereco.update(newData, {
            where: { id: id }
        });

        if (updatedRows === 0) {
            res.status(500).json({ error: 'Nenhum endereco encontrado para atualizar.' });
        } else {
            res.status(200).json(`Endereco com ID ${id} atualizado.`);
        }

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
    }


}




module.exports = {
    getAllEnderecos,
    getEnderecoById,
    register,
    deleteEndereco,
    editarEndereco
};
