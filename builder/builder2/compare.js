document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('../results.json');
    const data = await response.json();

    const resultsContainer = document.getElementById('results');

    data.processedFiles.forEach((file, idx) => {
        const section = document.createElement('div');
        section.innerHTML = `
            <h2>Arquivo ${idx + 1}: ${file.type}</h2>
            <pre>${JSON.stringify(file.stats, null, 2)}</pre>
            <pre>${JSON.stringify(file.advancedStats, null, 2)}</pre>
        `;
        resultsContainer.appendChild(section);
    });

    const comparison = document.createElement('div');
    comparison.innerHTML = `
        <h2>Comparação</h2>
        <pre>${JSON.stringify(data.comparison, null, 2)}</pre>
    `;
    resultsContainer.appendChild(comparison);
});
