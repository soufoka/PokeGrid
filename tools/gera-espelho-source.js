// Gera o main.js do PokeGrid-source a partir do main.js deste repo (o mesmo do dev): tira o aviso de atualizacao,
// que o source nao leva, confere que nada de fora usa o que saiu, e grava em CRLF. O main.js do source nunca e editado a mao: canal de IPC repetido (29/07/2026)
// e chamada sem a definicao (02/09/2026) ja deixaram o app sem abrir.
// Uso, com o PokeGrid-source clonado ao lado deste repo:
//   node tools/gera-espelho-source.js   grava ../PokeGrid-source/main.js
//   node tools/espelho-check.js         confere byte a byte (o test/espelho-source.test.js roda essa conferencia)
const fs = require('fs');
const path = require('path');
const DEV = path.join(__dirname, '..', 'main.js');
const SOURCE = path.join(__dirname, '..', '..', 'PokeGrid-source', 'main.js');

function espelho(dev) {
  let s = dev.replace(/\r\n/g, '\n');
  const a = s.indexOf('// Aviso de atualizacao'), b = s.indexOf('// ===== Relatorio de erros');
  if (a < 0 || b < a) throw new Error('ancoras do bloco de atualizacao nao achadas');
  const bloco = s.slice(a, b);
  s = s.slice(0, a) + s.slice(b);
  const chamada = "  if (!process.argv.includes('--hidden')) checarAtualizacao(win);\n";
  if (s.split(chamada).length !== 2) throw new Error('chamada do checarAtualizacao nao achada (ou repetida)');
  s = s.replace(chamada, '');
  // o que o bloco define (REPO, versaoMaior, checarAtualizacao) nao pode aparecer fora dele: usado em outro canto do dev, so
  // quebrava no source, na hora de rodar (ReferenceError), e o espelho-check compara com esta mesma saida, entao nunca acusava.
  // O dialog fica no import: desde 13/10/2026 a liberacao do webhook tambem usa.
  const nomes = [...bloco.matchAll(/^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]);
  const sobra = nomes.filter((n) => new RegExp('(^|[^\\w$.])' + n.replace(/\$/g, '\\$') + '(?![\\w$])').test(s));
  if (!nomes.includes('checarAtualizacao') || sobra.length) throw new Error('o espelho usa o que o bloco cortado define: ' + (sobra.join(', ') || 'bloco sem checarAtualizacao'));
  if (/api\.github\.com\/repos/.test(s)) throw new Error('sobrou referencia ao aviso de atualizacao');
  return s.replace(/\n/g, '\r\n');
}

module.exports = { espelho, DEV, SOURCE };

if (require.main === module) {
  fs.writeFileSync(SOURCE, espelho(fs.readFileSync(DEV, 'utf8')));
  console.log('OK espelho gravado em ' + SOURCE);
}
