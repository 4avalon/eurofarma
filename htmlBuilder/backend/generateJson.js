const fs = require('fs');
const path = require('path');
const { calculateStats, cleanHTML, getHTMLStats, getAdvancedStats, getUniqueWords, getHTMLTags } = require('./utils');
const processDomDirectly = require('./captureDom');
const files = require('./files');

console.log('[DEBUG] Arquivos carregados:', files);

// Gera o JSON consolidado
async function generateJson() {
    const result = { files: [] };

    for (const file of files) {
         if (!file.path || !file.name) {
        console.error(`[ERROR] Caminho ou nome do arquivo está indefinido:`, file);
        continue;
    }

    console.log(`[INFO] Processando arquivo: ${file.name} no caminho: ${file.path}`);
    
        try {
            console.log(`[INFO] Processando HTML original para: ${file.name}`);
            const htmlOriginal = fs.readFileSync(file.path, 'utf8');
            const originalStats = calculateStats(htmlOriginal);

            console.log(`[INFO] Processando DOM e limpando conteúdo para: ${file.name}`);
            const domData = await processDomDirectly(file.path, file.name);

            // Organizando os dados
            const fileEntry = {
                name: file.name,
                path: file.path,
                stats: {
                    original: originalStats,
                    dom: domData.stats,
                    clean: domData.stats, // Reutilizando as estatísticas de `cleanDom`
                    advanced: domData.advancedStats
                },
                content: {
                    original: htmlOriginal,
                    dom: domData.rawDom,
                    clean: domData.cleanDom
                },
                details: {
                    uniqueWords: domData.uniqueWords,
                    tags: domData.tags
                }
            };

            result.files.push(fileEntry);
            console.log(`[INFO] Processamento concluído para: ${file.name}`);
        } catch (error) {
            console.error(`[ERROR] Erro ao processar o arquivo ${file.name}: ${error.message}`);
        }
    }

    // Salvar resultados no JSON consolidado
    const outputPath = path.join(__dirname, '../resultado/result.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`[INFO] Arquivo JSON consolidado gerado com sucesso em: ${outputPath}`);
}

module.exports = generateJson;
