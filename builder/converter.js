const fs = require('fs');
const path = require('path');
const juice = require('juice');
const cheerio = require('cheerio');

const projectDir = __dirname; // Diretório do projeto
const resultsDir = path.join(projectDir, 'resultados'); // Subpasta para resultados

// Função para criar a pasta de resultados se não existir
function ensureResultsDir() {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log(`Pasta criada: ${resultsDir}`);
  }
}

// Função para listar arquivos .html no diretório
function listHtmlFiles() {
  return fs.readdirSync(projectDir).filter((file) => file.endsWith('.html'));
}

// Função para converter um arquivo para inline
function convertToInline(file) {
  try {
    const inputPath = path.join(projectDir, file);
    const outputInlinePath = path.join(resultsDir, `inline-${file}`);
    const html = fs.readFileSync(inputPath, 'utf-8');
    const $ = cheerio.load(html);

    // Remove links externos (CSS externos)
    $('link[rel="stylesheet"]').remove();

    // Converte para inline usando o Juice
    const inlinedHtml = juice($.html());
    fs.writeFileSync(outputInlinePath, inlinedHtml, 'utf-8');
    console.log(`Arquivo convertido para inline: ${outputInlinePath}`);
  } catch (error) {
    console.error(`Erro ao converter ${file} para inline:`, error);
  }
}

// Função para extrair estilos inline para o <style> no <head>
function extractToOutline(file) {
  try {
    const inputPath = path.join(projectDir, file);
    const outputOutlinePath = path.join(resultsDir, `outline-${file}`);
    const html = fs.readFileSync(inputPath, 'utf-8');
    const $ = cheerio.load(html);
    const extractedStyles = [];

    // Remove links externos (CSS externos)
    $('link[rel="stylesheet"]').remove();

    // Procura elementos com estilo inline
    $('[style]').each(function () {
      const style = $(this).attr('style');
      const tag = $(this).prop('tagName').toLowerCase();
      const classAttr = $(this).attr('class') || '';
      const idAttr = $(this).attr('id') || '';

      // Cria seletor baseado na tag, classe e ID
      let selector = tag;
      if (idAttr) selector += `#${idAttr}`;
      if (classAttr) selector += `.${classAttr.split(' ').join('.')}`;

      extractedStyles.push(`${selector} { ${style} }`);
      $(this).removeAttr('style'); // Remove estilo inline
    });

    // Adiciona os estilos extraídos no <head>
    const styleTag = `<style>${extractedStyles.join('\n')}</style>`;
    $('head').append(styleTag);

    // Salva o HTML atualizado
    fs.writeFileSync(outputOutlinePath, $.html(), 'utf-8');
    console.log(`Arquivo convertido para outline: ${outputOutlinePath}`);
  } catch (error) {
    console.error(`Erro ao extrair estilos de ${file}:`, error);
  }
}

// Função principal
function main() {
  ensureResultsDir(); // Garante que a pasta de resultados exista
  const htmlFiles = listHtmlFiles(); // Lista os arquivos .html
  if (htmlFiles.length === 0) {
    console.log('Nenhum arquivo .html encontrado no diretório.');
    return;
  }

  console.log(`Arquivos encontrados: ${htmlFiles.join(', ')}`);
  htmlFiles.forEach((file) => {
    convertToInline(file); // Converte para inline
    extractToOutline(file); // Converte para outline
  });
}

// Executa o programa
main();
