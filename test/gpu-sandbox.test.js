// GPU que nao abre isolada no Windows ("GPU process isn't usable. Goodbye."): o main.js REAL com um Electron de mentira.
// No Electron 43, a GPU que sobe e cai manda child-process-gone (o app reabre com --disable-gpu-sandbox); a que nem abre
// nao manda nada, e quem denuncia e a marca de abertura pendente que so o primeiro quadro apaga.
// Roda com: node test/gpu-sandbox.test.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
let fail = 0;
const ok = (c, l) => { console.log((c ? 'OK  ' : 'FAIL') + ' ' + l); if (!c) fail = 1; };
process.setMaxListeners(0); // cada abertura do main.js registra os seus uncaughtException/unhandledRejection
process.on('uncaughtException', (e) => { console.log('FAIL excecao no teste: ' + ((e && e.stack) || e)); process.exit(1); });

const Modulo = require('module');
const res0 = Modulo._resolveFilename, st0 = global.setTimeout, plat0 = process.platform, argv0 = process.argv;
const qq = new Proxy(function () {}, { get: (_t, k) => (k === 'then' || typeof k === 'symbol' ? undefined : qq), apply: () => qq, construct: () => qq });
let tmp, r; // r: o que o main.js fez nesta abertura
const app = new Proxy({
  on: (ev, fn) => { (r.app[ev] = r.app[ev] || []).push(fn); }, quit() {},
  commandLine: { appendSwitch: (s) => { if (s !== 'log-level') r.switches.push(s); } }, // log-level: o silenciador do topo do main.js
  relaunch: (o) => r.relaunch.push(o), exit: (c) => r.exit.push(c),
  getVersion: () => '9.9.9', getPath: () => tmp, userAgentFallback: 'Mozilla/5.0 Chrome/150 Electron/43.1.1',
  requestSingleInstanceLock: () => r.lock, whenReady: () => ({ then(cb) { cb(); } })
}, { get: (t, k) => (k in t ? t[k] : qq) });
const janela = () => new Proxy({ once: (ev, fn) => { (r.win[ev] = r.win[ev] || []).push(fn); }, on() {} }, { get: (t, k) => (k in t ? t[k] : qq) });
const eletron = new Proxy({
  app, ipcMain: { handle() {}, on() {}, removeHandler() {} },
  BrowserWindow: Object.assign(function () { return janela(); }, { getAllWindows: () => [], fromWebContents: () => qq }),
  session: { fromPartition: () => ({ setPermissionRequestHandler() {} }), defaultSession: qq },
  Menu: { buildFromTemplate: (t) => ({ items: t }), setApplicationMenu() {} }
}, { get: (t, k) => (k in t ? t[k] : qq) });
Modulo._resolveFilename = function (p, ...x) { if (p === 'electron') return 'electron-gpu'; if (p === 'https') return 'https-gpu'; return res0.call(this, p, ...x); };
require.cache['electron-gpu'] = { id: 'electron-gpu', filename: 'electron-gpu', loaded: true, exports: eletron };
require.cache['https-gpu'] = { id: 'https-gpu', filename: 'https-gpu', loaded: true, exports: { get: () => ({ on() { return this; } }) } };

// uma abertura do app: plataforma, argumentos e trava de instancia unica
function abre({ plat = 'win32', args = [], lock = true } = {}) {
  r = { app: {}, win: {}, switches: [], relaunch: [], exit: [], lock };
  Object.defineProperty(process, 'platform', { value: plat });
  process.argv = [process.execPath, 'main.js', ...args]; // fica ate a proxima abertura: o app le o argv tambem na hora da queda
  global.setTimeout = () => 0;
  try { delete require.cache[require.resolve(path.join(RAIZ, 'main.js'))]; require(path.join(RAIZ, 'main.js')); }
  finally { global.setTimeout = st0; Object.defineProperty(process, 'platform', { value: plat0 }); }
  return r;
}
const dispara = (fns, ...a) => (fns || []).forEach((f) => f(...a));
const gpuCaiu = (x, reason = 'crashed') => dispara(x.app['child-process-gone'], {}, { type: 'GPU', reason, exitCode: -2147483645 });
const pendente = () => fs.existsSync(path.join(tmp, 'gpu-boot-pendente'));
const marca = () => { try { return fs.readFileSync(path.join(tmp, 'gpu-sem-sandbox.txt'), 'utf8'); } catch { return null; } };
const relatorio = () => { try { return fs.readFileSync(path.join(tmp, 'relatorio-de-erros.log'), 'utf8'); } catch { return ''; } };
const limpo = () => { try { fs.rmSync(tmp, { recursive: true, force: true }); } catch {} tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pg-gpu-')); };
const semNoSandbox = (x) => !x.switches.includes('no-sandbox') && x.relaunch.every((o) => !o.args.includes('--no-sandbox'));

try {
  console.log('--- a GPU sobe e cai antes da janela: marca e reabre uma vez com --disable-gpu-sandbox ---');
  limpo();
  let a = abre({ args: ['.'] });
  ok(pendente() && a.switches.length === 0, 'abertura normal: grava a pendencia e sobe com o sandbox inteiro');
  gpuCaiu(a); gpuCaiu(a); gpuCaiu(a, 'killed');
  ok(a.relaunch.length === 1 && a.exit.length === 1 && a.exit[0] === 0, 'reabre uma vez so, mesmo com 3 quedas, e sai com codigo 0 (o iniciar.bat nao acusa erro) -> ' + a.relaunch.length + ' relaunch');
  const o = a.relaunch[0] || { args: [] };
  ok(o.execPath === process.execPath && o.args.join(' ') === 'main.js . --disable-gpu-sandbox', 'mesmo exe e mesmos argumentos (a pasta do app no codigo-fonte) mais --disable-gpu-sandbox -> ' + JSON.stringify(o));
  ok((marca() || '').startsWith('9.9.9 / Electron ' + process.versions.electron + '\n') && !pendente(), 'marca gravada com a versao, e a pendencia desta abertura apagada antes de reabrir');
  ok(/\[gpu\] a placa de video caiu antes da janela aparecer \(crashed, exit -2147483645\), reabrindo: so a placa de video fica fora do sandbox/.test(relatorio()), 'linha no 🐞 Erros com o motivo e o exit');
  ok(semNoSandbox(a), 'nunca --no-sandbox');

  console.log('--- a abertura reaberta: flag ligada, sem segundo nivel e sem loop ---');
  let b = abre({ args: ['.', '--disable-gpu-sandbox'] });
  ok(b.switches.includes('disable-gpu-sandbox') && !/mesmo com a placa de video fora do sandbox/.test(relatorio()), 'sobe com a GPU fora do sandbox e nao confunde a reabertura com falha');
  gpuCaiu(b); gpuCaiu(b);
  ok(b.relaunch.length === 0 && b.exit.length === 0 && semNoSandbox(b), 'a GPU caindo de novo: nao reabre outra vez nem apela pro --no-sandbox');
  dispara(b.win['ready-to-show']);
  ok(!pendente() && marca() !== null, 'primeiro quadro: apaga a pendencia e a marca fica');
  let c = abre({ args: ['.'] });
  ok(c.switches.includes('disable-gpu-sandbox') && /abrindo com --disable-gpu-sandbox/.test(relatorio()), 'abertura seguinte, sem a flag no atalho: a marca liga sozinha e fica no relatorio');

  console.log('--- a GPU nem abre (launch-failed, sem evento): a abertura seguinte ja vem com a flag ---');
  limpo();
  a = abre(); // morre no FATAL: nenhum evento, nenhum ready-to-show, nenhum will-quit
  ok(pendente() && a.relaunch.length === 0, 'a pendencia sobrevive a morte calada');
  b = abre();
  ok(b.switches.includes('disable-gpu-sandbox') && marca() !== null && /\[gpu\] a abertura anterior fechou antes da janela aparecer: so a placa de video/.test(relatorio()), 'a abertura seguinte le a pendencia, grava a marca, liga a flag e anota');
  ok(b.relaunch.length === 0 && semNoSandbox(b), 'sem reabrir e sem --no-sandbox');
  c = abre(); // morreu de novo, agora com a flag
  ok(/mesmo com a placa de video fora do sandbox: veja no FAQ/.test(relatorio()) && c.switches.filter((s) => s !== 'disable-gpu-sandbox').length === 0, 'nem com a flag: so anota e aponta o FAQ, sem segundo nivel');

  console.log('--- o que NAO pode ligar o fallback ---');
  limpo();
  a = abre({ args: ['--hidden'] });
  dispara(a.win['ready-to-show']);
  ok(!pendente(), '--hidden (nasce na bandeja): o primeiro quadro apaga a pendencia mesmo com a janela escondida');
  gpuCaiu(a);
  ok(a.relaunch.length === 0 && marca() === null, 'GPU que cai DEPOIS do primeiro quadro: o Chromium resolve, o app nao reabre');
  a = abre();
  dispara(a.app['will-quit']);
  ok(!pendente() && abre().switches.length === 0, 'fechou antes da janela aparecer (saida normal): a abertura seguinte segue com sandbox');
  limpo();
  fs.writeFileSync(path.join(tmp, 'gpu-sem-sandbox.txt'), '9.9.8 / Electron 43.0.0\n');
  a = abre();
  ok(a.switches.length === 0 && marca() === null && /versao nova/.test(relatorio()), 'marca de outra versao do app ou do Electron: apagada, tenta com sandbox de novo');
  limpo();
  a = abre({ lock: false }); gpuCaiu(a);
  ok(!pendente() && a.relaunch.length === 0 && a.switches.length === 0, 'segunda instancia (so mostra a outra): nao mexe na pendencia nem vigia a GPU');
  for (const plat of ['linux', 'darwin']) {
    limpo();
    a = abre({ plat }); gpuCaiu(a); abre({ plat });
    ok(!pendente() && a.switches.length === 0 && a.relaunch.length === 0, plat + ': nada muda (o --no-sandbox de la e o chrome-sandbox)');
  }

  console.log('--- portatil: reabre pelo .exe que o usuario abriu, nao pela pasta temporaria ---');
  limpo();
  process.env.PORTABLE_EXECUTABLE_FILE = 'D:\\Jogos\\PokeGrid-portable.exe';
  try { a = abre({ args: ['--hidden'] }); gpuCaiu(a); } finally { delete process.env.PORTABLE_EXECUTABLE_FILE; }
  ok(a.relaunch.length === 1 && a.relaunch[0].execPath === 'D:\\Jogos\\PokeGrid-portable.exe' && a.relaunch[0].args.join(' ') === 'main.js --hidden --disable-gpu-sandbox', 'portatil -> ' + JSON.stringify(a.relaunch[0]));
} finally {
  Modulo._resolveFilename = res0; process.argv = argv0;
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch {}
}
console.log(fail ? '\nFALHOU' : '\nGPU sem sandbox: tudo certo');
process.exit(fail);
