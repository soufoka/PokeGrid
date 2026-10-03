// Gera o main.js do PokeGrid-source a partir do main.js deste repo (o mesmo do dev): tira o aviso de atualizacao,
// que o source nao leva, e grava em CRLF. O main.js do source nunca e editado a mao: canal de IPC repetido (29/07/2026)
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
  s = s.slice(0, a) + s.slice(b);
  const chamada = "  if (!process.argv.includes('--hidden')) checarAtualizacao(win);\n";
  if (s.split(chamada).length !== 2) throw new Error('chamada do checarAtualizacao nao achada (ou repetida)');
  s = s.replace(chamada, '');
  if (s.split(', dialog, Notification').length !== 2) throw new Error('import do dialog nao achado');
  s = s.replace(', dialog, Notification', ', Notification');
  if (/checarAtualizacao|dialog\./.test(s)) throw new Error('sobrou referencia ao aviso de atualizacao');
  return s.replace(/\n/g, '\r\n');
}

module.exports = { espelho, DEV, SOURCE };

if (require.main === module) {
  fs.writeFileSync(SOURCE, espelho(fs.readFileSync(DEV, 'utf8')));
  console.log('OK espelho gravado em ' + SOURCE);
}
