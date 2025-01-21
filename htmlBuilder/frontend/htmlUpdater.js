export function updateHtmlWithJsonData(data) {
    data.files.forEach((file, index) => {
        const fileIndex = index + 1; // Para mapear "file1" ou "file2"

        // Atualiza tagsHtml (Original, DOM, Final)
        updateStatsList(`file${fileIndex}OriginalTagsHtmlStats`, file.html.original.stats.tagsHtml);
        updateStatsList(`file${fileIndex}DomTagsHtmlStats`, file.html.dom.stats.tagsHtml);
        updateStatsList(`file${fileIndex}FinalTagsHtmlStats`, file.html.final.stats.tagsHtml);

        // Atualiza attributes (Original, DOM, Final)
        updateStatsList(`file${fileIndex}OriginalAttributesStats`, file.html.original.stats.attributes);
        updateStatsList(`file${fileIndex}DomAttributesStats`, file.html.dom.stats.attributes);
        updateStatsList(`file${fileIndex}FinalAttributesStats`, file.html.final.stats.attributes);

        // Atualiza tagsCss (Original, DOM, Final)
        updateStatsList(`file${fileIndex}OriginalTagsCssStats`, file.html.original.stats.tagsCss.inlineProperties);
        updateStatsList(`file${fileIndex}DomTagsCssStats`, file.html.dom.stats.tagsCss.inlineProperties);
        updateStatsList(`file${fileIndex}FinalTagsCssStats`, file.html.final.stats.tagsCss.inlineProperties);

        // Atualiza content (Original, DOM, Final)
        setContent(`file${fileIndex}OriginalContent`, file.html.original.content);
        setContent(`file${fileIndex}DomContent`, file.html.dom.content);
        setContent(`file${fileIndex}FinalContent`, file.html.final.content);
    });
}

// Função para preencher uma lista de estatísticas
function updateStatsList(elementId, stats) {
    const listElement = document.getElementById(elementId);
    if (!listElement) {
        console.warn(`[WARN] Elemento com ID "${elementId}" não encontrado.`);
        return;
    }

    listElement.innerHTML = ''; // Limpa o conteúdo atual
    Object.entries(stats).forEach(([key, value]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        listElement.appendChild(listItem);
    });
}

// Função para preencher o conteúdo de uma div
function setContent(elementId, content) {
    const contentElement = document.getElementById(elementId);
    if (!contentElement) {
        console.warn(`[WARN] Elemento com ID "${elementId}" não encontrado.`);
        return;
    }

    contentElement.textContent = content;
}
