//backend/utils.js

const fs = require('fs');

// === Funções Utilitárias ===
function htmlToTxt(html) {
    return html.replace(/\s+/g, ' ').trim();
}

function removeTbody(html) {
    return html.replace(/<tbody[^>]*>|<\/tbody>/gi, '');
}

function cleanHTML(html) {
    return removeTbody(htmlToTxt(html));
}

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

function getHTMLTags(content) {
    const tags = content.match(/<[^>]+>/g) || [];
    return Array.from(new Set(tags.map((tag) => tag.split(' ')[0].toLowerCase())));
}

module.exports = {
    cleanHTML,
    getHTMLStats,
    getAdvancedStats,
    getUniqueWords,
    getHTMLTags,
};
