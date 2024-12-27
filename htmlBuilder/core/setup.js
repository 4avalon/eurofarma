const { processFile, compareFiles } = require('./midwares.js');


const filesToProcess = [
    { path: '../dinamico/index.html', type: 'dinamico' },
    { path: '../estatico/euro5.html', type: 'estatico' },
];

const processedFiles = filesToProcess.map((file) => ({
    ...file,
    ...processFile(file.path),
}));

const comparison = compareFiles(
    processedFiles[0].content,
    processedFiles[1].content
);

console.log('Comparação Final:', comparison);

// Salvar resultados em JSON
import fs from 'fs';
fs.writeFileSync(
    '../results.json',
    JSON.stringify({ processedFiles, comparison }, null, 2)
);
