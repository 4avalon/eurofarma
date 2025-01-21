const emailService = require('../services/emailService'); // Importa o serviço de e-mail

// Controlador para enviar e-mails
exports.sendEmail = async (req, res) => {
    const { to, subject, html } = req.body; // Captura os dados da requisição

    // Verifica se o campo "to" é um array válido
    if (!to || (!Array.isArray(to) && typeof to !== 'string')) {
        return res.status(400).json({ error: 'Os destinatários devem ser enviados como um array ou string.' });
    }

    try {
        // Chama o serviço de e-mail com os dados recebidos
        await emailService.sendHtmlEmail(to, subject, html);
        res.json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro no controlador:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
    }
};
