
export function resetHtmlSpaces(htmlString) {
    return htmlString
        .replace(/\s{2,}/g, ' ') // Substitui múltiplos espaços por um único espaço
        .replace(/>\s+</g, '><') // Remove espaços entre tags
        .trim(); // Remove espaços extras no início e no final
}

export function indentHtml(htmlString) {
    const cleanedHtml = resetHtmlSpaces(htmlString); // Limpar espaços desnecessários
    const tags = cleanedHtml.split(/(?=<)|(?<=>)/); // Divide em tags e texto
    let formattedHtml = '';
    let indentLevel = 0;

    const indentSize = 2;

    // Tags inline (não alteram recuo)
    const inlineTags = ['b', 'i', 'a', 'span', 'u', 'small', 'strong', 'em', 'sup', 'sub', 'br', 'meta', 'link'];

    tags.forEach((tag) => {
        tag = tag.trim();

        if (!tag) return; // Ignorar conteúdo vazio

        // Ignorar comentários
        if (tag.startsWith('<!--')) {
            formattedHtml += '\n' + ' '.repeat(indentLevel * indentSize) + tag;
            return; // Pule para a próxima tag
        }

        const tagName = tag.match(/^<\/?([a-zA-Z0-9]+)/)?.[1]?.toLowerCase();

        if (tag.startsWith('</')) {
            // Tag de fechamento
            if (!inlineTags.includes(tagName)) {
                indentLevel--;
            }
            formattedHtml += '\n' + ' '.repeat(indentLevel * indentSize) + tag;
        } else if (tag.endsWith('/>')) {
            // Tag autocontida
            formattedHtml += '\n' + ' '.repeat(indentLevel * indentSize) + tag;
        } else if (tag.startsWith('<')) {
            // Tag de abertura
            formattedHtml += '\n' + ' '.repeat(indentLevel * indentSize) + tag;
            if (!inlineTags.includes(tagName)) {
                indentLevel++;
            }
        } else {
            // Texto simples entre tags
            formattedHtml += '\n' + ' '.repeat(indentLevel * indentSize) + tag;
        }
    });

    return formattedHtml.trim();
}

