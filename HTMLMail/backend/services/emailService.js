const nodemailer = require('nodemailer');

// Configuração do Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '4avalon1989@gmail.com', // E-mail do remetente
        pass: 'drsj cfoj txgp spxl',  // Senha de app gerada pelo Gmail
    },
    logger: true, // Ativa logs para debug
    debug: true,  // Ativa depuração para identificar problemas
});

// Função para enviar o e-mail formatado com HTML
exports.sendHtmlEmail = async (to, subject, html) => {
    // Garante que 'to' seja uma string separada por vírgulas (caso seja um array)
    const recipients = Array.isArray(to) ? to.join(', ') : to;

    const mailOptions = {
        from: '4avalon1989@gmail.com', // Remetente
        to: recipients, // Destinatários (suporta múltiplos)
        subject: subject || 'Sem Assunto', // Assunto padrão, caso não seja fornecido
        html: html, // Conteúdo HTML do e-mail
    };

    try {
        // Envia o e-mail usando o Nodemailer
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso para:', recipients);
        console.log('ID do e-mail:', info.messageId);
    } catch (error) {
        console.error('Erro no serviço de e-mail:', error);
        throw error; // Relança o erro para que o controlador o trate
    }
};
