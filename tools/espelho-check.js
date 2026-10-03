// Confere que o main.js do PokeGrid-source e exatamente o gerado do main.js deste repo (sem o aviso de atualizacao, CRLF).
// Uso: node tools/espelho-check.js   (sai com 0 se bate; 1 mostrando onde difere)
const fs = require('fs');
const { espelho, DEV, SOURCE } = require('./gera-espelho-source');

const esperado = espelho(fs.readFileSync(DEV, 'utf8'));
const real = fs.readFileSync(SOURCE, 'utf8');
if (esperado === real) {
  console.log('OK espelho byte a byte (' + real.length + ' chars, CRLF)');
  process.exit(0);
}
let i = 0;
while (i < esperado.length && esperado[i] === real[i]) i++;
console.log('DIFERE no offset ' + i + '\nesperado: ' + JSON.stringify(esperado.slice(i, i + 120)) +
  '\nsource:   ' + JSON.stringify(real.slice(i, i + 120)) + '\nPra regerar: node tools/gera-espelho-source.js');
process.exit(1);
