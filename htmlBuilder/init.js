import { loadJson } from './frontend/jsonLoader.js';
import { updateHtmlWithJsonData } from './frontend/htmlUpdater.js';
import { setupViewButtons } from './frontend/viewManager.js';
import { setupStatsManager } from './frontend/hideStats.js';
import { setupExportButtons } from './frontend/exportHandler.js';
import { analyzeTags } from './frontend/tagCategorizer.js';

const jsonFilePath = './resultado/result.json';

async function init() {
    console.log('[INFO] Configurando botões de alternância...');
    setupViewButtons();

    console.log('[INFO] Configurando botão de estatísticas...');
    setupStatsManager();

    console.log('[INFO] Configurando botões de exportação...');
    setupExportButtons();

    console.log('[INFO] Carregando JSON...');
    const jsonData = await loadJson(jsonFilePath);

    if (jsonData) {
        console.log('[INFO] Atualizando HTML com os dados do JSON...');
        updateHtmlWithJsonData(jsonData);

        console.log('[INFO] Analisando tags...');
        analyzeTags(); // Certifique-se de que isso é executado depois que o HTML é atualizado
    } else {
        console.error('[ERROR] Não foi possível atualizar o HTML devido a falha no carregamento do JSON.');
    }
}

init();
