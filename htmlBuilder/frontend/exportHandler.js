import { resetHtmlSpaces, indentHtml } from './htmlFormatter.js';

/**
 * Configura os eventos de exportação para os botões
 */
export function setupExportButtons() {
    console.info('[INFO] Configurando eventos de exportação...');

    const exportButtons = document.querySelectorAll('.export-button');

    exportButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const targetId = `file${index + 1}FinalContent`;
            const contentElement = document.getElementById(targetId);

            if (contentElement) {
                const fileName = `html_final_file${index + 1}.html`;
                let fileContent = contentElement.textContent;

                // Aplica o reset de espaços e a indentação antes de exportar
                try {
                    fileContent = resetHtmlSpaces(fileContent);
                    fileContent = indentHtml(fileContent);
                } catch (error) {
                    console.error(`[ERROR] Erro ao formatar o conteúdo: ${error.message}`);
                    return;
                }

                exportToFile(fileContent, fileName);
                console.info(`[INFO] Conteúdo exportado: ${fileName}`);
            } else {
                console.warn(`[WARN] Elemento não encontrado para exportar: ${targetId}`);
            }
        });
    });
}

/**
 * Exporta o conteúdo fornecido como um arquivo
 */
function exportToFile(content, filename) {
    try {
        const blob = new Blob([content], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.info(`[INFO] Arquivo ${filename} criado com sucesso`);
    } catch (error) {
        console.error(`[ERROR] Erro ao criar arquivo: ${error.message}`);
    }
}
