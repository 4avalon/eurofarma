// Função para adicionar logs no quadro de logs
function addLog(message) {
    const logContainer = document.getElementById('log-container');
    const newLog = document.createElement('p');
    newLog.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(newLog);
    logContainer.scrollTop = logContainer.scrollHeight; // Rola para o final
}

// Testando a função de log
addLog('Application initialized.');
addLog('Waiting for user interaction...');

document.addEventListener("DOMContentLoaded", () => {
    // Elementos do DOM
    const mainTable = document.getElementById("main-table");
    const dynamicButton = document.getElementById("process-dynamic");
    const staticButton = document.getElementById("process-static");

    // Lista de componentes dinâmicos
    const dynamicComponents = [
        "header.html",
        "content1.html",
        "content2.html",
        "content3.html",
        "content4.html",
        "footer.html"
    ];

    const staticFile = "euro5.html";

    // Funções auxiliares
    function sanitizeHTML(html) {
        return html
            .replace(/<\/?tbody>/gi, "") // Remove <tbody>
            .replace(/\s{2,}/g, " ") // Remove múltiplos espaços
            .replace(/\n\s*/g, "") // Remove quebras de linha desnecessárias
            .trim();
    }

    async function exportHTMLToServer(filename, content) {
        try {
            const response = await fetch('http://localhost:3000/save-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, content }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar o arquivo para o servidor.');
            }

            const result = await response.json();
            addLog(`Arquivo salvo no servidor: ${result.path}`);
        } catch (error) {
            addLog(`Erro ao salvar o arquivo no servidor: ${error.message}`);
        }
    }

    function cleanDOM(dom) {
        dom.querySelectorAll("script").forEach((script) => script.remove());

        const logDomDiv = dom.querySelector("#logDom");
        if (logDomDiv) logDomDiv.remove();

        const exportButton = dom.querySelector("#exportButton");
        if (exportButton) exportButton.remove();

        return dom;
    }

    async function processDynamic() {
        addLog("Iniciando processamento dinâmico...");
        if (mainTable) mainTable.innerHTML = ""; // Limpa o conteúdo

        for (const file of dynamicComponents) {
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
                const content = await response.text();
                mainTable.insertAdjacentHTML("beforeend", content.trim());
                addLog(`Componente carregado: ${file}`);
            } catch (error) {
                addLog(`Erro ao carregar ${file}: ${error.message}`);
            }
        }

        const domText = document.documentElement.outerHTML;
        const parser = new DOMParser();
        let dom = parser.parseFromString(domText, "text/html");
        dom = cleanDOM(dom);

        const sanitizedDomText = sanitizeHTML(dom.documentElement.outerHTML);
        await exportHTMLToServer("resultados/dynamic_output.html", sanitizedDomText);
        addLog("Processamento dinâmico concluído.");
    }

    async function processStatic() {
        addLog("Iniciando processamento estático...");
        try {
            const response = await fetch(staticFile);
            if (!response.ok) throw new Error(`Erro ao carregar ${staticFile}`);
            const content = await response.text();

            const parser = new DOMParser();
            let dom = parser.parseFromString(content, "text/html");
            dom = cleanDOM(dom);

            const sanitizedDomText = sanitizeHTML(dom.documentElement.outerHTML);
            await exportHTMLToServer("resultados/static_output.html", sanitizedDomText);
            addLog("Processamento estático concluído.");
        } catch (error) {
            addLog(`Erro ao processar arquivo estático: ${error.message}`);
        }
    }

    // Event Listeners
    dynamicButton.addEventListener("click", processDynamic);
    staticButton.addEventListener("click", processStatic);
});
