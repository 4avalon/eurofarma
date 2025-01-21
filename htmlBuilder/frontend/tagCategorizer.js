// Listas de referência para HTML, CSS e Atributos

const htmlSafeList = [
    'table',      // HTML 3.2 - Essencial para estrutura de layout em e-mails antigos
    'tr',         // HTML 3.2 - Parte da estrutura de tabelas
    'td',         // HTML 3.2 - Parte da estrutura de tabelas
    'img',        // HTML 3.2 - Para exibição de imagens
    'a',          // HTML 3.2 - Links
    'p',          // HTML 3.2 - Parágrafos de texto
    'br',         // HTML 3.2 - Quebras de linha
    'b',          // HTML 3.2 - Texto em negrito
    'i',          // HTML 3.2 - Texto em itálico
    'u',          // HTML 3.2 - Texto sublinhado
    'font',       // HTML 3.2 - Usado em estilos legados
    'center',     // HTML 3.2 - Obsoleto, mas útil em e-mails
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // HTML 3.2 - Cabeçalhos para título
    'ul', 'ol', 'li', // HTML 3.2 - Listas não ordenadas e ordenadas
    'hr',         // HTML 3.2 - Linha horizontal para divisores
    'caption',    // HTML 4.0 - Para títulos de tabelas
    'tbody',      // HTML 4.0 - Tabelas adicionam automaticamente <tbody>
    'strong',     // HTML 4.0 - Semântico: ênfase
    'em',         // HTML 4.0 - Semântico: ênfase
    'col',        // HTML 4.01 - Controle de largura de colunas
    'colgroup',   // HTML 4.01 - Agrupamento de colunas
    'small'       // HTML 4.0 - Texto menor
];

const htmlRiskList = [
    'div',        // HTML 3.2 - Problemas de renderização em e-mails
    'span',       // HTML 4.0 - Suporte inconsistente; substituível por outras tags
    'script',     // HTML 3.2 - Bloqueado por motivos de segurança
    'style',      // HTML 4.0 - Estilos no <head> geralmente são removidos
    'form',       // HTML 4.0 - Forms são geralmente não funcionais em e-mails
    'input',      // HTML 4.0 - Input interativo não funciona na maioria dos clientes
    'iframe',     // HTML 4.0 - Bloqueado em quase todos os clientes
    'object',     // HTML 4.0 - Ignorado na maioria dos clientes
    'embed',      // HTML 4.0 - Sem suporte
    'meta',       // HTML 4.0 - Pode causar comportamento inesperado
    'link',       // HTML 4.0 - Ignorado em muitos clientes
    'nav',        // HTML 5.0 - Sem suporte em e-mails
    'main',       // HTML 5.0 - Sem suporte em e-mails
    'header',     // HTML 5.0 - Sem suporte em e-mails
    'video',      // HTML 5.0 - Suporte muito limitado
    'audio',      // HTML 5.0 - Suporte muito limitado
    'canvas',     // HTML 5.0 - Geralmente não renderizado
    'svg',        // HTML 5.0 - Suporte inconsistente, especialmente em Outlook
    'picture',    // HTML 5.0 - Ignorado na maioria dos clientes
    'section',    // HTML 5.0 - Semântico, mas ignorado em e-mails
    'article',    // HTML 5.0 - Semântico, mas ignorado em e-mails
    'aside',      // HTML 5.0 - Semântico, mas ignorado em e-mails
    'footer'      // HTML 5.0 - Semântico, mas ignorado em e-mails
];

const cssSafeList = [
    'color',              // CSS 1.0 - Cor do texto
    'background-color',   // CSS 1.0 - Cor de fundo
    'font-size',          // CSS 1.0 - Tamanho da fonte
    'font-family',        // CSS 1.0 - Família da fonte
    'text-align',         // CSS 1.0 - Alinhamento do texto
    'line-height',        // CSS 1.0 - Altura da linha
    'margin',             // CSS 1.0 - Margens externas
    'padding',            // CSS 1.0 - Espaçamento interno
    'border',             // CSS 1.0 - Bordas
    'width',              // CSS 1.0 - Largura
    'height',             // CSS 1.0 - Altura
    'background',         // CSS 1.0 - Imagens de fundo
    'vertical-align',     // CSS 1.0 - Alinhamento vertical
    'font-variant',       // CSS 1.0 - Ajuste de estilo de texto
    'letter-spacing',     // CSS 1.0 - Ajuste do espaçamento entre letras
    'border-spacing'      // CSS 2.1 - Espaçamento entre células de tabelas
];

const cssRiskList = [
    'float',              // CSS 1.0 - Problemas de renderização em vários clientes
    'z-index',            // CSS 1.0 - Suporte limitado
    'position',           // CSS 2.1 - Suporte inconsistente
    'white-space',        // CSS 2.1 - Inconsistente em e-mails
    'overflow',           // CSS 2.1 - Suporte limitado
    'content',            // CSS 2.1 - Frequentemente ignorado
    'flex',               // CSS 3.0 - Não suportado na maioria dos clientes
    'grid',               // CSS 3.0 - Não suportado na maioria dos clientes
    'transform',          // CSS 3.0 - Suporte limitado
    'animation',          // CSS 3.0 - Ignorado ou removido por clientes
    'clip-path',          // CSS 3.0 - Suporte muito limitado
    'filter',             // CSS 3.0 - Suporte muito limitado
    'opacity',            // CSS 3.0 - Problemas de renderização
    'box-shadow',         // CSS 3.0 - Suporte inconsistente
    'text-shadow',        // CSS 3.0 - Suporte inconsistente
    'background-attachment' // CSS 1.0 - Sem suporte prático
];

const attributeSafeList = [
    'style',              // HTML 3.2 - Inline styles
    'src',                // HTML 3.2 - Fonte de imagens
    'href',               // HTML 3.2 - Links
    'alt',                // HTML 3.2 - Texto alternativo para imagens
    'width',              // HTML 3.2 - Controle de largura
    'height',             // HTML 3.2 - Controle de altura
    'align',              // HTML 3.2 - Alinhamento
    'border',             // HTML 3.2 - Bordas em tabelas e imagens
    'cellpadding',        // HTML 3.2 - Espaçamento interno em tabelas
    'cellspacing',        // HTML 3.2 - Espaçamento entre células de tabela
    'bgcolor',            // HTML 3.2 - Cor de fundo
    'name',               // HTML 3.2 - Usado em alguns contextos legados
    'title',              // HTML 4.0 - Tooltip para links e imagens
    'lang',               // HTML 4.0 - Idioma do conteúdo
    'data-*',             // HTML 5.0 - Atributos personalizados para transporte de dados
    'role'                // HTML 5.0 - Para acessibilidade
];

const attributeRiskList = [
    'onclick',            // HTML 4.0 - Ignorado por segurança
    'onload',             // HTML 4.0 - Ignorado por segurança
    'onerror',            // HTML 4.0 - Ignorado por segurança
    'target',             // HTML 4.0 - Controle limitado em e-mails
    'id',                 // HTML 4.0 - Suporte limitado
    'class',              // HTML 4.0 - Inline preferido
    'type',               // HTML 4.0 - Ignorado em muitos clientes
    'action',             // HTML 4.0 - Forms ignorados
    'method',             // HTML 4.0 - Forms ignorados
    'placeholder',        // HTML 5.0 - Ignorado em muitos clientes
    'draggable',          // HTML 5.0 - Ignorado em e-mails
    'spellcheck',         // HTML 5.0 - Sem suporte
    'tabindex',           // HTML 4.0 - Sem efeito prático
    'aria-*',             // HTML 5.0 - Sem uso prático em e-mails
    'sandbox',            // HTML 5.0 - Sem suporte em e-mails
    'contextmenu'         // HTML 5.0 - Ignorado em clientes de e-mail
];



// Funções para Categorizar e Aplicar Categorias

/**
 * Categoriza uma tag com base nas listas de segurança e risco
 */
function categorizeTag(tagName, safeList, riskList) {
    if (safeList.includes(tagName)) {
        return 'safe';
    } else if (riskList.includes(tagName)) {
        return 'risk';
    } else {
        return 'unknown';
    }
}

/**
 * Aplica uma categoria visual a um elemento de tag
 */
function applyTagCategory(tagElement, category) {
    switch (category) {
        case 'safe':
            tagElement.style.backgroundColor = 'green';
            tagElement.style.color = 'white';
            break;
        case 'risk':
            tagElement.style.backgroundColor = 'red';
            tagElement.style.color = 'white';
            break;
        case 'unknown':
            tagElement.style.backgroundColor = 'gray';
            tagElement.style.color = 'white';
            break;
    }
}

/**
 * Categoriza um atributo com base nas listas de segurança e risco
 */
function categorizeAttribute(attributeName, safeList, riskList) {
    if (safeList.includes(attributeName)) {
        return 'safe';
    } else if (riskList.includes(attributeName)) {
        return 'risk';
    } else {
        return 'unknown';
    }
}

/**
 * Aplica uma categoria visual a um elemento de atributo
 */
function applyAttributeCategory(attributeElement, category) {
    switch (category) {
        case 'safe':
            attributeElement.style.backgroundColor = 'green';
            attributeElement.style.color = 'white';
            break;
        case 'risk':
            attributeElement.style.backgroundColor = 'red';
            attributeElement.style.color = 'white';
            break;
        case 'unknown':
            attributeElement.style.backgroundColor = 'gray';
            attributeElement.style.color = 'white';
            break;
    }
}

// Funções para Processar Elementos

/**
 * Processa as tags e aplica categorias
 */
function processTags(selector, safeList, riskList, type, groupId) {
    const tags = document.querySelectorAll(`#${selector} li`);
    tags.forEach(tagElement => {
        const tagName = tagElement.textContent.split(':')[0].trim().toLowerCase();
        const category = categorizeTag(tagName, safeList, riskList);
        applyTagCategory(tagElement, category);
    });
}

/**
 * Processa os atributos e aplica categorias
 */
function processAttributes(selector, safeList, riskList, groupId) {
    const attributes = document.querySelectorAll(`#${selector} li`);
    attributes.forEach(attributeElement => {
        const attributeName = attributeElement.textContent.split(':')[0].trim().toLowerCase();
        const category = categorizeAttribute(attributeName, safeList, riskList);
        applyAttributeCategory(attributeElement, category);
    });
}

// Análise Geral

/**
 * Analisa todas as tags, atributos e CSS no HTML e aplica categorias
 */
export function analyzeTags() {
    console.info('[INFO] Iniciando análise de tags, atributos e CSS...');

    const groups = [
        { id: 'Original', htmlId: 'file1OriginalTagsHtmlStats', cssId: 'file1OriginalTagsCssStats', attributesId: 'file1OriginalAttributesStats' },
        { id: 'DOM', htmlId: 'file1DomTagsHtmlStats', cssId: 'file1DomTagsCssStats', attributesId: 'file1DomAttributesStats' },
        { id: 'Final', htmlId: 'file1FinalTagsHtmlStats', cssId: 'file1FinalTagsCssStats', attributesId: 'file1FinalAttributesStats' },
        { id: 'Original', htmlId: 'file2OriginalTagsHtmlStats', cssId: 'file2OriginalTagsCssStats', attributesId: 'file2OriginalAttributesStats' },
        { id: 'DOM', htmlId: 'file2DomTagsHtmlStats', cssId: 'file2DomTagsCssStats', attributesId: 'file2DomAttributesStats' },
        { id: 'Final', htmlId: 'file2FinalTagsHtmlStats', cssId: 'file2FinalTagsCssStats', attributesId: 'file2FinalAttributesStats' },
    ];

    groups.forEach(group => {
        console.info(`[INFO] Analisando grupo: ${group.id}...`);
        processTags(group.htmlId, htmlSafeList, htmlRiskList, 'HTML', group.id);
        processTags(group.cssId, cssSafeList, cssRiskList, 'CSS', group.id);
        processAttributes(group.attributesId, attributeSafeList, attributeRiskList, group.id);
    });

    console.info('[INFO] Análise concluída.');
}
