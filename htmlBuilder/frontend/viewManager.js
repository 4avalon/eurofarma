// Configura os botões para alternar entre visões
export function setupViewButtons() {
    const buttons = [
        { id: 'showOriginal', targetClass: 'file-view-original' },
        { id: 'showDom', targetClass: 'file-view-dom' },
        { id: 'showFinal', targetClass: 'file-view-final' }
    ];

    buttons.forEach(({ id, targetClass }) => {
        const button = document.getElementById(id);
        if (!button) {
            console.warn(`[WARN] Botão com ID "${id}" não encontrado.`);
            return;
        }

        button.addEventListener('click', () => showView(targetClass));
    });

    setupCopyButtons(); // Configurar os botões de copiar
}

// Função para exibir a visão desejada
function showView(targetClass) {
    // Alterna a visibilidade dos contents
    const allContentViews = document.querySelectorAll('.file-view');
    allContentViews.forEach(view => {
        if (view.classList.contains(targetClass)) {
            view.classList.remove('hidden'); // Mostra o conteúdo
        } else {
            view.classList.add('hidden'); // Oculta os outros
        }
    });

    // Alterna a visibilidade dos stats
    const allStatsViews = document.querySelectorAll('.stats-block');
    allStatsViews.forEach(view => {
        if (view.classList.contains(targetClass)) {
            view.classList.remove('hidden'); // Mostra o stats correspondente
        } else {
            view.classList.add('hidden'); // Oculta os outros stats
        }
    });

    // Alterna a visibilidade dos botões de exportação
    const allExportButtons = document.querySelectorAll('.export-button');
    allExportButtons.forEach(button => {
        if (targetClass === 'file-view-final') {
            button.classList.remove('hidden'); // Mostra os botões de exportação
        } else {
            button.classList.add('hidden'); // Oculta os botões de exportação
        }
    });

    // Atualiza o estado visual dos botões de alternância
    const buttons = document.querySelectorAll('.view-buttons button');
    buttons.forEach(button => button.classList.remove('active'));

    const activeButton = [...buttons].find(button =>
        button.id.toLowerCase().includes(targetClass.split('-').pop())
    );
    if (activeButton) activeButton.classList.add('active');
}

// Configura os botões de copiar para copiar o conteúdo da visão ativa
function setupCopyButtons() {
    const copyButtons = [
        { id: 'copyFile1Content', columnId: 'left-column' },
        { id: 'copyFile2Content', columnId: 'right-column' }
    ];

    copyButtons.forEach(({ id, columnId }) => {
        const button = document.getElementById(id);
        if (!button) {
            console.warn(`[WARN] Botão de copiar com ID "${id}" não encontrado.`);
            return;
        }

        button.addEventListener('click', () => {
            copyActiveContent(columnId);
        });
    });
}

// Função para copiar o conteúdo da visão atualmente ativa
function copyActiveContent(columnId) {
    const columnElement = document.getElementById(columnId);
    if (!columnElement) {
        console.error(`[ERRO] Coluna com ID "${columnId}" não encontrada.`);
        return;
    }

    // Verifica qual visão está ativa dentro da coluna (Original, DOM, ou Final)
    const activeContent = columnElement.querySelector('.file-view:not(.hidden)');
    if (!activeContent) {
        console.warn(`[WARN] Nenhum conteúdo ativo encontrado na coluna "${columnId}".`);
        return;
    }

    // Pega o texto visível no elemento ativo
    const textToCopy = activeContent.innerText || activeContent.textContent;
    if (!textToCopy) {
        console.warn(`[WARN] Nenhum conteúdo para copiar na visão ativa.`);
        return;
    }

    // Usa a API Clipboard para copiar o conteúdo
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log(`[INFO] Conteúdo copiado com sucesso da coluna "${columnId}".`);
        alert('Conteúdo copiado para a área de transferência!');
    }).catch(err => {
        console.error(`[ERRO] Falha ao copiar conteúdo: ${err}`);
    });
}
