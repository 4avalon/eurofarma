const fs = require('fs');
const path = require('path');

// === CONFIGURAÇÕES E ARQUIVOS ===
const files = [
    { name: 'index.html', path: path.join(__dirname, '../dinamico/index.html') },
    { name: 'euro5.html', path: path.join(__dirname, '../estatico/euro5.html') }
];

// === FUNÇÕES UTILITÁRIAS ===
function loadFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`[ERROR] Erro ao carregar arquivo: ${filePath}`, error.message);
        return '';
    }
}

function processIndexHtml(htmlOriginal) {
    const components = [
        { placeholder: '<!-- HEADER -->', file: path.join(__dirname, '../dinamico/header.html') },
        { placeholder: '<!-- CONTENT1 -->', file: path.join(__dirname, '../dinamico/content1.html') },
        { placeholder: '<!-- CONTENT2 -->', file: path.join(__dirname, '../dinamico/content2.html') },
        { placeholder: '<!-- CONTENT3 -->', file: path.join(__dirname, '../dinamico/content3.html') },
        { placeholder: '<!-- CONTENT4 -->', file: path.join(__dirname, '../dinamico/content4.html') },
        { placeholder: '<!-- FOOTER -->', file: path.join(__dirname, '../dinamico/footer.html') },
    ];

    let processedHtml = htmlOriginal;
    components.forEach(({ placeholder, file }) => {
        const componentContent = loadFile(file);
        processedHtml = processedHtml.replace(placeholder, componentContent || `<!-- Erro ao carregar ${file} -->`);
    });

    return processedHtml;
}

function generateDom(filePath, fileName) {
    const htmlOriginal = loadFile(filePath);

    if (fileName === 'index.html') {
        console.log(`[INFO] Montando DOM para: ${fileName}`);
        return processIndexHtml(htmlOriginal);
    }

    console.log(`[INFO] Retornando DOM original para: ${fileName}`);
    return htmlOriginal;
}

// === FUNÇÕES PARA HTML_FINAL ===
function generateFinalHtml(htmlDom) {
    let finalHtml = htmlDom;

    // Remover tags desnecessárias
    finalHtml = finalHtml.replace(/<script[\s\S]*?<\/script>/gi, ''); // Remove <script> e conteúdo
    finalHtml = finalHtml.replace(/<!--[\s\S]*?-->/g, ''); // Remove comentários
    finalHtml = finalHtml.replace(/<\/?tbody>/gi, ''); // Remove <tbody>

    // Normalizar espaços
    finalHtml = finalHtml.replace(/\s{2,}/g, ' '); // Substituir múltiplos espaços por um espaço
    finalHtml = finalHtml.trim(); // Remover espaços no início e no final

    // Normalizar tags e atributos
    finalHtml = finalHtml.replace(/<([A-Z][^>]*)>/g, (match, tag) => `<${tag.toLowerCase()}>`); // Tags minúsculas
    finalHtml = finalHtml.replace(/<img(.*?)>/g, '<img$1 />'); // Fechar tags autocontidas

    return finalHtml;
}

// === FUNÇÃO PARA GERAR STATS ===
function calculateStats(htmlContent) {
    const tagMatches = htmlContent.match(/<\/?[a-z][^>]*?>/gi) || [];
    const tags = tagMatches.map(tag => tag.replace(/<\/?|\/?>/g, '').split(' ')[0]);
    const tagCounts = tags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    return {
        characters: htmlContent.length,
        words: htmlContent.split(/\s+/).filter(Boolean).length,
        tags: tagCounts
    };
}

// === FUNÇÃO PRINCIPAL ===
async function generateJson() {
    const result = { files: [] };

    for (const file of files) {
        try {
            console.log(`[INFO] Processando arquivo: ${file.name}`);

            const htmlOriginal = loadFile(file.path);
            const htmlDom = generateDom(file.path, file.name);
            const htmlFinal = generateFinalHtml(htmlDom);

            // Calcula os stats
            const originalStats = calculateStats(htmlOriginal);
            const domStats = calculateStats(htmlDom);
            const finalStats = calculateStats(htmlFinal);

            // Monta a entrada para o JSON
            const fileEntry = {
                name: file.name,
                path: file.path,
                html_original: { content: htmlOriginal, stats: originalStats },
                html_dom: { content: htmlDom, stats: domStats },
                html_final: { content: htmlFinal, stats: finalStats }
            };

            result.files.push(fileEntry);
            console.log(`[INFO] Processamento concluído para: ${file.name}`);
        } catch (error) {
            console.error(`[ERROR] Erro ao processar o arquivo ${file.name}: ${error.message}`);
        }
    }

    const outputPath = path.join(__dirname, '../resultado/result.json');
    try {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`[INFO] Arquivo JSON gerado com sucesso em: ${outputPath}`);
    } catch (error) {
        console.error(`[ERROR] Erro ao salvar o arquivo JSON: ${error.message}`);
    }
}

// === EXECUÇÃO ===
generateJson().catch((error) => {
    console.error('[ERROR] Erro ao executar o processamento:', error.message);
});
