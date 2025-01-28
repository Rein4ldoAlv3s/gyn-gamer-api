const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Para gerar IDs únicos caso o usuário não envie um
const User = require('./models/User');

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Permita apenas este domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Se precisar enviar cookies ou headers com credenciais
}));

app.use(express.json());


// Chave secreta para JWT
const SECRET_KEY = 'minha_chave_secreta_super_segura';

// "Banco de dados" simulado usuarios
const users = [];

// "Banco de dados" simulado endereços
const enderecos = [];

// Testar conexão
const sequelize = require('./config/database');
sequelize.authenticate()
    .then(() => console.log('Conexão com o MySQL foi bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao MySQL:', err));

// Sincronizar tabelas
sequelize.sync({ force: true })
    .then(() => {
        console.log('Tabelas sincronizadas com sucesso!');
    })
    .catch((err) => console.error('Erro ao sincronizar tabelas:', err));


// Rota de registro de Usuário
app.post('/register', async (req, res) => {
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
        // const hashedPassword = await bcrypt.hash(password, 10);

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


});

// Rota de listagem de Usuário
app.get('/list-users', async (req, res) => {


    res.status(201).json({ users });
})


// Rota de registro de Endereço
app.post('/registerEndereco', async (req, res) => {
    const {
        nomeDestinatario,
        logradouro,
        rua,
        estado,
        cidade,
        tipoEndereco,
        cep,
        complemento
    } = req.body;

    // Verificar se o usuário já existe
    // if (enderecos.find(endereco => endereco.nomeUsuario === nomeUsuario)) {
    //     return res.status(400).json({ message: 'Usuário já existe!' });
    // }

    enderecos.push(
        {
            nomeDestinatario,
            logradouro,
            rua,
            estado,
            cidade,
            tipoEndereco,
            cep,
            complemento
        }
    );

    console.log(enderecos);
    res.status(201).json({ message: 'Endereco registrado com sucesso!' });
});

// Rota de login
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { nomeUsuario, password } = req.body;

    const user = users.find(user => user.nomeUsuario === nomeUsuario);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ nomeUsuario: user.nomeUsuario }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Rota protegida
app.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Acesso concedido!', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido!' });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
