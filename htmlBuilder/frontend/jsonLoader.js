// jsonLoader.js
export async function loadJson(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro ao carregar JSON: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('[ERROR] Falha ao carregar o JSON:', error.message);
        return null;
    }
}
