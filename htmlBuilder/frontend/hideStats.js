// statsManager.js

export function setupStatsManager() {
    const closeButton = document.getElementById('close-stats');
    const statsSection = document.getElementById('stats-section');

    if (!closeButton || !statsSection) {
        console.warn('[WARN] Botão de fechar ou seção de estatísticas não encontrado.');
        return;
    }

    // Adiciona o evento de clique ao botão
    closeButton.addEventListener('click', () => {
        toggleStatsSection(statsSection);
    });
}

// Função para alternar a visibilidade da seção de estatísticas
function toggleStatsSection(section) {
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}
