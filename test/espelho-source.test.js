// O main.js do PokeGrid-source e gerado do main.js deste repo pelo tools/gera-espelho-source.js (sem o aviso de
// atualizacao). Este teste confere o gerador e roda a conferencia (tools/espelho-check.js) quando o PokeGrid-source esta
// clonado ao lado deste repo; sem ele (CI do release), a conferencia pula.
// Roda com: node test/espelho-source.test.js
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const RAIZ = path.join(__dirname, '..');
let falhas = 0;
const ok = (c, l) => { console.log((c ? 'ok   ' : 'FALHA ') + l); if (!c) falhas++; };

console.log('--- o gerador tira o aviso de atualizacao e deixa um main.js que abre ---');
let gerado = '', dev = '', SOURCE = '';
try {
  const g = require(path.join(RAIZ, 'tools', 'gera-espelho-source.js'));
  SOURCE = g.SOURCE;
  dev = fs.readFileSync(g.DEV, 'utf8');
  gerado = g.espelho(dev);
  ok(true, 'tools/gera-espelho-source.js gera o espelho');
} catch (e) { ok(false, 'tools/gera-espelho-source.js: ' + e.message); }
if (gerado) {
  const canais = (s) => [...s.matchAll(/ipcMain\.(?:handle|on)\(\s*'([^']+)'/g)].map((m) => m[1]);
  ok(!/checarAtualizacao|dialog\.|api\.github\.com\/repos/.test(gerado), 'sem o aviso de atualizacao, nem a chamada dele na criacao da janela (02/09/2026: ReferenceError e o app nao abria)');
  ok(canais(gerado).join() === canais(dev).join() && new Set(canais(gerado)).size === canais(gerado).length, 'os mesmos canais de IPC do dev, nenhum repetido (29/07/2026: canal repetido e a janela nunca nascia) -> ' + canais(gerado).length);
  let erro = null; try { new Function(gerado); } catch (e) { erro = e.message; }
  ok(!erro, 'parseia' + (erro ? ': ' + erro : ''));
  ok(!/[^\r]\n/.test(gerado), 'todo em CRLF');
}

console.log('--- o main.js do PokeGrid-source e o gerado, byte a byte ---');
if (!SOURCE || !fs.existsSync(SOURCE)) ok(!!SOURCE, 'sem o PokeGrid-source ao lado deste repo: nada a conferir');
else {
  const r = spawnSync(process.execPath, [path.join(RAIZ, 'tools', 'espelho-check.js')], { encoding: 'utf8' });
  ok(r.status === 0, 'tools/espelho-check.js -> ' + String(r.stdout + r.stderr).trim().split(/\r?\n/).join(' | '));
}
console.log(falhas ? '\n' + falhas + ' falha(s)' : '\nEspelho do source: tudo certo');
process.exit(falhas ? 1 : 0);
