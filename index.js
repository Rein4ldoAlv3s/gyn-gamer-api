const express = require('express');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Dados simulados (em um projeto real, você usaria um banco de dados)
let users = [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
];

let users2 = [
    {
        id: 1,
        nome: 'João',
        sobrenome: "Silva",
        telefone: "62994756683",
        dto: new Date(2024, 11, 25),
        email: "joao.silva@gmail.com",
        senha: "teste123"
    }
];

// Rota inicial (padrão)
app.get('/', (req, res) => {
    res.send('Bem-vindo à API dsadas!');
});

// **[GET] - Retorna todos os usuários**
app.get('/users', (req, res) => {
    res.json(users);
});

// **[GET] - Retorna todos os usuários**
app.get('/usersgyngamer', (req, res) => {
    res.json(users2);
});

// **[POST] - Adiciona um novo usuário**
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
