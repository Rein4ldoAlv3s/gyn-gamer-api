const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Permita apenas este domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Se precisar enviar cookies ou headers com credenciais
}));

app.use(express.json());


// Chave secreta para JWT
const SECRET_KEY = 'minha_chave_secreta_super_segura';

// "Banco de dados" simulado
const users = [];



// Rota de registro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário já existe
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe!' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Rota de login
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
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
