const express = require('express');
const cors = require('cors'); // Importa o CORS
const bodyParser = require('body-parser');
const emailController = require('./controllers/emailController');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite CORS

// Aumenta o limite do payload permitido
app.use(bodyParser.json({ limit: '10mb' })); // Ajuste o limite conforme necessário
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Para analisar formulários no corpo da requisição

// Rotas
app.post('/enviar-email', emailController.sendEmail);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
