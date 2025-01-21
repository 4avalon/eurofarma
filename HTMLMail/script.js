function toggleGroup(groupElement) {
    const groupName = groupElement.dataset.group;
    const emailButtons = document.querySelectorAll(`.email-option[data-group="${groupName}"]`);
    const allActive = [...emailButtons].every(button => button.classList.contains('active'));

    emailButtons.forEach(button => {
        button.classList.toggle('active', !allActive);
    });

    updateGroupState(groupElement);
    updateEmailField();
}

function toggleEmail(emailButton, event) {
    event.stopPropagation(); // Evita disparar o clique no grupo
    emailButton.classList.toggle('active');

    const groupName = emailButton.dataset.group;
    const groupElement = document.querySelector(`.group[data-group="${groupName}"]`);
    updateGroupState(groupElement);
    updateEmailField();
}

function updateGroupState(groupElement) {
    const groupName = groupElement.dataset.group;
    const emailButtons = document.querySelectorAll(`.email-option[data-group="${groupName}"]`);
    const allActive = [...emailButtons].every(button => button.classList.contains('active'));

    groupElement.classList.toggle('green', allActive);
}

function updateEmailField() {
    const activeEmails = [...document.querySelectorAll('.email-option.active')]
        .map(button => button.dataset.email);
    document.getElementById('toEmail').value = activeEmails.join(', ');
}

function sendEmail() {
    const toEmail = document.getElementById('toEmail').value.split(',').map(e => e.trim());
    const subject = document.getElementById('subject').value;
    const htmlContent = document.getElementById('htmlContent').value;

    fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: toEmail, subject, html: htmlContent })
    })
    .then(res => res.json())
    .then(data => alert('E-mail enviado com sucesso!'))
    .catch(err => alert('Erro ao enviar e-mail: ' + err));
}
