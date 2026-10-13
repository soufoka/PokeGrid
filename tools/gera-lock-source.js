// Gera o package-lock.json do PokeGrid-source a partir do lock deste repo: so o Electron e o que ele puxa, com as mesmas
// versoes, URLs e hashes de integridade, e fixa o Electron exato no package.json do source. Sem rede. Os instaladores do
// source usam npm ci --ignore-scripts: sem lock, cada instalacao pegava o que estivesse mais novo no npm.
// Uso, com o PokeGrid-source clonado ao lado deste repo, toda vez que o Electron daqui mudar:
//   node tools/gera-lock-source.js     grava ../PokeGrid-source/package-lock.json e o "electron" do package.json de la
//   (o test/espelho-source.test.js confere a versao, o lock e os 3 instaladores)
const fs = require('fs');
const path = require('path');
const LOCK = path.join(__dirname, '..', 'package-lock.json');
const SRC = path.join(__dirname, '..', '..', 'PokeGrid-source');

function lockDoSource(lockI, pkgS) {
  const P = lockI.packages;
  const ver = P['node_modules/electron'].version;
  // resolucao do npm: a dependencia de "a/node_modules/x" e procurada subindo as pastas ate a raiz
  const acha = (de, nome) => { let base = de; for (;;) { const c = (base ? base + '/' : '') + 'node_modules/' + nome; if (P[c]) return c; if (!base) return null; const i = base.lastIndexOf('/node_modules/'); base = i < 0 ? '' : base.slice(0, i); } };
  const fecho = new Set(), fila = ['node_modules/electron'];
  while (fila.length) {
    const k = fila.shift(); if (fecho.has(k)) continue; fecho.add(k);
    const e = P[k];
    for (const d of Object.keys(Object.assign({}, e.dependencies, e.optionalDependencies))) { const c = acha(k, d); if (!c) throw new Error('dependencia ' + d + ' de ' + k + ' fora do lock'); fila.push(c); }
  }
  const pk = { '': { name: pkgS.name, version: pkgS.version, license: pkgS.license, devDependencies: { electron: ver } } };
  [...fecho].sort().forEach((k) => { pk[k] = Object.assign({}, P[k], { dev: true }); delete pk[k].peer; if (pk[k].hasInstallScript) throw new Error(k + ' tem script de instalacao: o --ignore-scripts dos instaladores ia pular'); });
  return { ver, lock: { name: pkgS.name, version: pkgS.version, lockfileVersion: 3, requires: true, packages: pk } };
}

module.exports = { lockDoSource, LOCK, SRC };

if (require.main === module) {
  const pjArq = path.join(SRC, 'package.json');
  const pkgS = JSON.parse(fs.readFileSync(pjArq, 'utf8'));
  const { ver, lock } = lockDoSource(JSON.parse(fs.readFileSync(LOCK, 'utf8')), pkgS);
  fs.writeFileSync(path.join(SRC, 'package-lock.json'), JSON.stringify(lock, null, 2) + '\n');
  fs.writeFileSync(pjArq, fs.readFileSync(pjArq, 'utf8').replace(/"electron": "[^"]*"/, '"electron": "' + ver + '"'));
  console.log('OK lock do source: electron ' + ver + ', ' + (Object.keys(lock.packages).length - 1) + ' pacotes');
}
