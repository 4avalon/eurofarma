const fs = require('fs');
const path = require('path');
const { cleanHTML, getHTMLStats, getAdvancedStats, getUniqueWords, getHTMLTags } = require('./utils');

// Função para processar o DOM diretamente a partir do conteúdo do arquivo
async function processDomDirectly(filePath, fileName) {
    console.log(`--- INICIANDO PROCESSAMENTO DO DOM PARA ${fileName} ---`);

    // Ler o conteúdo do arquivo
    let rawDom;
    try {
        rawDom = fs.readFileSync(filePath, 'utf8');
        console.log(`[INFO] DOM carregado diretamente do arquivo para ${fileName}`);
    } catch (error) {
        console.error(`[ERROR] Erro ao ler o arquivo ${filePath}: ${error.message}`);
        throw error;
    }

    // Limpar o conteúdo HTML
    const cleanDom = cleanHTML(rawDom);

    // Gerar estatísticas
    const stats = getHTMLStats(cleanDom);
    const advancedStats = getAdvancedStats(cleanDom);
    const uniqueWords = getUniqueWords(cleanDom);
    const tags = getHTMLTags(cleanDom);

    console.log(`--- PROCESSAMENTO DO DOM CONCLUÍDO PARA ${fileName} ---`);

    return { rawDom, cleanDom, stats, advancedStats, uniqueWords, tags };
}

module.exports = processDomDirectly;
