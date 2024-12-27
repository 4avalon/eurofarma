const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json({ limit: '10mb' })); // Suporta JSON grande

// Rota para salvar os arquivos
app.post('/save-file', (req, res) => {
    const { filename, content } = req.body;

    if (!filename || !content) {
        return res.status(400).json({ error: 'Filename and content are required.' });
    }

    const filePath = path.join(__dirname, 'resultados', filename);

    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(`Erro ao salvar o arquivo: ${err.message}`);
            return res.status(500).json({ error: 'Failed to save the file.' });
        }

        console.log(`Arquivo salvo: ${filePath}`);
        res.json({ message: 'File saved successfully!', path: filePath });
    });
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
