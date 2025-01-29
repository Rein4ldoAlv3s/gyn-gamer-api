const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

//chamada routes e controllers
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
//



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

// Rota padrão para checar o servidor
app.get('/', (req, res) => {
    res.send('Bem-vindo à API com rotas separadas!');
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
