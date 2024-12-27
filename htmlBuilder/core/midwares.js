import fs from 'fs';
import { cleanHTML, getHTMLStats, getAdvancedStats } from './utils.js';

function processFile(filePath) {
    console.log(`Processando arquivo: ${filePath}`);
    const content = cleanHTML(fs.readFileSync(filePath, 'utf-8'));

    return {
        content,
        stats: getHTMLStats(content),
        advancedStats: getAdvancedStats(content),
    };
}

function compareFiles(file1Content, file2Content) {
    const file1Sentences = file1Content.match(/[^.!?]+[.!?]+/g) || [];
    const file2Sentences = file2Content.match(/[^.!?]+[.!?]+/g) || [];

    return {
        repeatedSentences: file1Sentences.filter((s) => file2Sentences.includes(s)),
        uniqueToFile1: file1Sentences.filter((s) => !file2Sentences.includes(s)),
        uniqueToFile2: file2Sentences.filter((s) => !file1Sentences.includes(s)),
    };
}
