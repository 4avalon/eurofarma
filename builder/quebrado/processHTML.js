const fs = require('fs');

// === Funções Utilitárias ===
function htmlToTxt(html) {
    if (typeof html !== 'string') {
        console.warn('htmlToTxt: Entrada não é uma string. Forçando conversão.');
        html = String(html);
    }
    return html.replace(/\s+/g, ' ').trim();
}

function removeTbody(html) {
    if (typeof html !== 'string') {
        console.warn('removeTbody: Entrada não é uma string. Forçando conversão.');
        html = String(html);
    }
    return html.replace(/<tbody[^>]*>|<\/tbody>/gi, '');
}

function cleanHTML(html) {
    return removeTbody(htmlToTxt(html));
}

// === Estatísticas e Análises ===
function getHTMLStats(html) {
    return {
        characters: html.length,
        words: html.split(/\s+/).length,
        tags: (html.match(/<[^>]+>/g) || []).length,
    };
}

function getAdvancedStats(content) {
    const sentences = content.match(/[^\.!\?]+[\.!\?]+/g) || [];
    const paragraphs = content.match(/<p[^>]*>.*?<\/p>/gi) || [];
    const words = content.match(/\b\w+\b/g) || [];
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length || 0;
    const avgSentenceLength = words.length / sentences.length || 0;

    return {
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        avgWordLength: avgWordLength.toFixed(2),
        avgSentenceLength: avgSentenceLength.toFixed(2),
    };
}

function getUniqueWords(content) {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    return Array.from(new Set(words));
}

function compareUniqueWords(file1Words, file2Words) {
    const file1Unique = file1Words.filter((word) => !file2Words.includes(word));
    const file2Unique = file2Words.filter((word) => !file1Words.includes(word));
    return { file1Unique, file2Unique };
}

function getHTMLTags(content) {
    const tags = content.match(/<[^>]+>/g) || [];
    return Array.from(new Set(tags.map((tag) => tag.split(' ')[0].toLowerCase())));
}

function compareHTMLTags(tags1, tags2) {
    const uniqueToFile1 = tags1.filter((tag) => !tags2.includes(tag));
    const uniqueToFile2 = tags2.filter((tag) => !tags1.includes(tag));
    return { uniqueToFile1, uniqueToFile2 };
}

function getRepeatedAndUniqueSentences(file1Content, file2Content) {
    const file1Sentences = file1Content.match(/[^.!?]+[.!?]+/g) || [];
    const file2Sentences = file2Content.match(/[^.!?]+[.!?]+/g) || [];

    const repeatedSentences = file1Sentences.filter((sentence) => file2Sentences.includes(sentence));
    const uniqueToFile1 = file1Sentences.filter((sentence) => !file2Sentences.includes(sentence));
    const uniqueToFile2 = file2Sentences.filter((sentence) => !file1Sentences.includes(sentence));

    return { repeatedSentences, uniqueToFile1, uniqueToFile2 };
}

function saveResultsToJSON(results, fileName) {
    fs.writeFileSync(fileName, JSON.stringify(results, null, 2), 'utf-8');
    console.log(`Resultados salvos em ${fileName}`);
}

// === Fluxo Principal ===
function processFile(filePath) {
    console.log(`--- INICIANDO PROCESSAMENTO DO ARQUIVO ${filePath} ---`);

    let content = fs.readFileSync(filePath, 'utf-8');
    console.log('Arquivo lido com sucesso.');
    content = cleanHTML(content);

    const stats = getHTMLStats(content);
    const advancedStats = getAdvancedStats(content);
    const uniqueWords = getUniqueWords(content);
    const tags = getHTMLTags(content);

    console.log(`--- PROCESSAMENTO CONCLUÍDO PARA ${filePath} ---`);

    return { content, stats, advancedStats, uniqueWords, tags };
}

// Processar múltiplos arquivos
const filesToProcess = ['LOGeuro5.html', 'LOGindex.html'];
const processedFiles = filesToProcess.map((file) => processFile(file));

// Comparações
const wordComparison = compareUniqueWords(
    processedFiles[0].uniqueWords,
    processedFiles[1].uniqueWords
);

const tagComparison = compareHTMLTags(
    processedFiles[0].tags,
    processedFiles[1].tags
);

const sentenceComparison = getRepeatedAndUniqueSentences(
    processedFiles[0].content,
    processedFiles[1].content
);

// Salvar resultados
const results = {
    processedFiles: processedFiles.map(({ stats, advancedStats, uniqueWords, tags }) => ({
        stats,
        advancedStats,
        uniqueWords,
        tags,
    })),
    wordComparison,
    tagComparison,
    sentenceComparison,
};

saveResultsToJSON(results, 'results.json');
