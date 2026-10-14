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
  ok(!/checarAtualizacao|versaoMaior|api\.github\.com\/repos/.test(gerado), 'sem o aviso de atualizacao, nem a chamada dele na criacao da janela (02/09/2026: ReferenceError e o app nao abria)');
  ok(/\bdialog\b[^\n]*= require\('electron'\)/.test(gerado) && /dialog\.showMessageBox/.test(gerado), 'o dialog fica no import: a liberacao do webhook tambem usa (13/10/2026)');
  const g2 = require(path.join(RAIZ, 'tools', 'gera-espelho-source.js'));
  const comRepo = dev.replace(/\r\n/g, '\n').replace("const whOkFile = () =>", "const repoUa = () => 'PokeGrid/' + REPO;\nconst whOkFile = () =>");
  let recusou = ''; try { g2.espelho(comRepo); } catch (e) { recusou = e.message; }
  ok(comRepo !== dev.replace(/\r\n/g, '\n') && /REPO/.test(recusou), 'o dev usando fora do bloco o que so o bloco cortado define (REPO): o gerador recusa (antes o espelho saia e quebrava so no source, ao rodar) -> ' + (recusou || 'gerou'));
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
console.log('--- instalacao do PokeGrid-source: versoes travadas e nada de script de pacote ---');
// A versao sem executavel instalava com npm install, Electron com ^ e sem lock: cada instalacao pegava o que estivesse mais
// novo no npm, inclusive um pacote sequestrado (o worm do npm de 2025 se espalhou por postinstall). E quem extraia o zip
// novo por cima da pasta antiga ficava com o Electron velho pra sempre.
const SRC = SOURCE ? path.dirname(SOURCE) : '';
if (!SRC || !fs.existsSync(path.join(SRC, 'package.json'))) ok(!!SOURCE, 'sem o PokeGrid-source ao lado deste repo: nada a conferir');
else {
  const pj = JSON.parse(fs.readFileSync(path.join(SRC, 'package.json'), 'utf8'));
  let lock = null; try { lock = JSON.parse(fs.readFileSync(path.join(SRC, 'package-lock.json'), 'utf8')); } catch {}
  const doInstalador = JSON.parse(fs.readFileSync(path.join(RAIZ, 'package-lock.json'), 'utf8')).packages['node_modules/electron'].version;
  const pin = pj.devDependencies && pj.devDependencies.electron;
  ok(pin === doInstalador, 'o source pede o Electron exato do instalador (' + pin + ' / ' + doInstalador + ')');
  const P = (lock && lock.packages) || {};
  ok(!!lock && P[''] && P[''].devDependencies.electron === pin && (P['node_modules/electron'] || {}).version === pin, 'package-lock.json do source existe e bate com o package.json');
  const pacotes = Object.keys(P).filter((k) => k);
  ok(pacotes.length > 5 && pacotes.every((k) => P[k].integrity && /^https:\/\/registry\.npmjs\.org\//.test(P[k].resolved || '') && !P[k].hasInstallScript), 'todo pacote do lock com hash de integridade, do registro oficial do npm e sem script de instalacao (' + pacotes.length + ')');
  const inst = ['Abrir PokeGrid.bat', 'iniciar.bat', 'iniciar.sh'].map((f) => fs.readFileSync(path.join(SRC, f), 'utf8'));
  ok(inst.every((t) => /npm ci --ignore-scripts/.test(t) && !/^\s*(call )?npm install/m.test(t)), 'os 3 instaladores usam npm ci --ignore-scripts, nenhum npm install');
  ok(inst.every((t) => t.includes("require('./node_modules/electron/package.json').version===require('./package.json').devDependencies.electron")), 'os 3 reinstalam quando o Electron da pasta nao e o pedido (zip novo extraido por cima da pasta antiga)');
}
console.log(falhas ? '\n' + falhas + ' falha(s)' : '\nEspelho do source: tudo certo');
process.exit(falhas ? 1 : 0);
