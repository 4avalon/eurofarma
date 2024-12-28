//backend/files.js
const path = require('path');

const files = [
    { name: 'index.html', path: path.join(__dirname, '../dinamico/index.html') },
    { name: 'euro5.html', path: path.join(__dirname, '../estatico/euro5.html') }
];

module.exports = files;
