// utils.js
export function htmlToTxt(html) {
    return html.replace(/\s+/g, ' ').trim();
}

export function removeTags(html, tag) {
    const regex = new RegExp(`<${tag}[^>]*>|</${tag}>`, 'gi');
    return html.replace(regex, '');
}

export function cleanHTML(html) {
    return removeTags(htmlToTxt(html), 'tbody');
}

export function getHTMLStats(html) {
    return {
        characters: html.length,
        words: html.split(/\s+/).length,
        tags: (html.match(/<[^>]+>/g) || []).length,
    };
}

export function getAdvancedStats(content) {
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = content.match(/<p[^>]*>.*?<\/p>/gi) || [];
    const words = content.match(/\b\w+\b/g) || [];
    return {
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        avgWordLength: (words.reduce((sum, word) => sum + word.length, 0) / words.length || 0).toFixed(2),
        avgSentenceLength: (words.length / sentences.length || 0).toFixed(2),
    };
}
