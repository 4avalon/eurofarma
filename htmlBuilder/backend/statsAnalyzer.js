// === Funções Utilitárias ===
/**
 * Conta o número de caracteres em um conteúdo.
 * @param {string} content - O conteúdo a ser analisado.
 * @returns {number} - O número de caracteres.
 */
function countCharacters(content) {
    return content.length;
}

/**
 * Conta o número de palavras em um conteúdo.
 * @param {string} content - O conteúdo a ser analisado.
 * @returns {number} - O número de palavras.
 */
function countWords(content) {
    return content.split(/\s+/).filter(Boolean).length;
}

// === Análise de Tags HTML ===
/**
 * Analisa e conta as tags HTML em um conteúdo.
 * @param {string} content - O conteúdo HTML.
 * @returns {object} - Um objeto com a contagem de cada tag.
 */
function analyzeHtmlTags(content) {
    const tagMatches = content.match(/<\/?[a-z][^>]*?>/gi) || [];
    const tags = tagMatches.map(tag => tag.replace(/<\/?|\/?>/g, '').split(' ')[0]);

    return tags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
}

// === Análise de Atributos HTML ===
/**
 * Analisa e conta os atributos HTML em um conteúdo.
 * @param {string} content - O conteúdo HTML.
 * @returns {object} - Um objeto com a contagem de cada atributo.
 */
function analyzeHtmlAttributes(content) {
    // Captura todas as tags HTML que contenham atributos
    const tagMatches = content.match(/<[a-z][^>]*?>/gi) || [];

    const attributes = {};

    tagMatches.forEach(tag => {
        // Extrai somente os atributos da tag, ignorando o nome da tag
        const attributeMatches = tag.match(/\s([a-zA-Z-]+)(=["'][^"']*["'])?/g) || [];
        attributeMatches.forEach(attr => {
            const attrName = attr.split('=')[0].trim(); // Pega o nome do atributo
            attributes[attrName] = (attributes[attrName] || 0) + 1;
        });
    });

    return attributes;
}


// === Análise de CSS Inline ===
/**
 * Analisa as propriedades CSS inline em um conteúdo.
 * @param {string} content - O conteúdo HTML.
 * @returns {object} - Um objeto com a contagem de propriedades CSS inline.
 */
function analyzeCssTags(content) {
    const inlineStyleMatches = content.match(/style=["']([^"']*)["']/gi) || [];
    const inlineStyles = inlineStyleMatches.map(match =>
        match.replace(/style=["']|["']$/g, '').trim()
    );

    const cssProperties = inlineStyles.flatMap(style =>
        style.split(';').map(prop => prop.trim().split(':')[0]?.trim())
    );

    const propertyCounts = cssProperties.reduce((acc, prop) => {
        if (prop) acc[prop] = (acc[prop] || 0) + 1;
        return acc;
    }, {});

    return {
        inlineProperties: propertyCounts,
        inlineCount: inlineStyleMatches.length
    };
}

// === Funções Principais ===
/**
 * Analisa estatísticas do HTML (caracteres, palavras, tags).
 * @param {string} content - O conteúdo HTML.
 * @returns {object} - Estatísticas do HTML.
 */
function analyzeHtmlStats(content) {
    return {
        characters: countCharacters(content),
        words: countWords(content),
        tagsHtml: analyzeHtmlTags(content)
    };
}

/**
 * Analisa estatísticas de CSS inline em um conteúdo HTML.
 * @param {string} content - O conteúdo HTML.
 * @returns {object} - Estatísticas de CSS inline.
 */
function analyzeCssStats(content) {
    return {
        tagsCss: analyzeCssTags(content)
    };
}


module.exports = {
    countCharacters,
    countWords,
    analyzeHtmlTags,
     analyzeHtmlAttributes,
    analyzeCssTags,
    analyzeHtmlStats,
    analyzeCssStats
};
