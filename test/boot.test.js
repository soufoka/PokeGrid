// Teste de inicializacao: o app tem que ABRIR sempre.
//
// Existe por causa de um incidente real (1.5.5 a 1.5.9): o canal 'webhook:send' ficou registrado
// duas vezes no main.js. O Electron recusa registro repetido e interrompe o carregamento do
// arquivo, entao o programa subia como processo e a janela nunca era criada. Ninguem percebeu por
// quatro versoes porque os testes olhavam outras coisas.
//
// Rode com: npm test    (ou: node test/boot.test.js)
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
let falhas = 0;
const ok = (cond, rotulo) => { console.log((cond ? 'ok   ' : 'FALHA ') + rotulo); if (!cond) falhas++; };

const main = fs.readFileSync(path.join(RAIZ, 'main.js'), 'utf8');
const preload = fs.readFileSync(path.join(RAIZ, 'preload.js'), 'utf8');
const index = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

console.log('--- registros que o Electron recusa se vierem repetidos ---');
const canais = [...main.matchAll(/ipcMain\.handle\(\s*'([^']+)'/g)].map((m) => m[1]);
const repetidos = canais.filter((c, i) => canais.indexOf(c) !== i);
ok(canais.length > 0, 'main.js registra canais de IPC (' + canais.length + ')');
ok(repetidos.length === 0, 'nenhum canal repetido' + (repetidos.length ? ' -> ' + [...new Set(repetidos)].join(', ') : ''));
const expostos = [...preload.matchAll(/exposeInMainWorld\(\s*'([^']+)'/g)].map((m) => m[1]);
ok(expostos.filter((c, i) => expostos.indexOf(c) !== i).length === 0, 'preload sem exposicao repetida');

console.log('--- o main.js carrega de verdade (Electron de mentira, que recusa repetidos) ---');
const registrados = new Set();
const eventos = () => { const o = { on: () => o, once: () => o, removeListener: () => o }; return o; };
const janela = Object.assign(eventos(), {
  loadFile: () => Promise.resolve(), loadURL: () => Promise.resolve(), show() {}, hide() {}, focus() {},
  maximize() {}, minimize() {}, restore() {}, destroy() {}, close() {}, center() {}, setMenu() {},
  setMenuBarVisibility() {}, setSkipTaskbar() {}, setAlwaysOnTop() {}, setBounds() {}, setSize() {}, setTitle() {},
  isMinimized: () => false, isVisible: () => false, isMaximized: () => false, isDestroyed: () => false,
  getBounds: () => ({ x: 0, y: 0, width: 1280, height: 800 }), getSize: () => [1280, 800],
  webContents: Object.assign(eventos(), {
    send() {}, executeJavaScript: () => Promise.resolve(null), setWindowOpenHandler() {}, setAudioMuted() {},
    setZoomFactor() {}, openDevTools() {}, reload() {}, id: 1, getWebContentsId: () => 1,
    isDestroyed: () => false, hostWebContents: null
  })
});
function JanelaFalsa() { return janela; }
JanelaFalsa.getAllWindows = () => [janela];
JanelaFalsa.fromWebContents = () => janela;
const CAMINHOS = { appData: path.join(RAIZ, '.teste-tmp'), userData: path.join(RAIZ, '.teste-tmp'), temp: path.join(RAIZ, '.teste-tmp'), exe: process.execPath, home: RAIZ, desktop: RAIZ, documents: RAIZ, downloads: RAIZ, logs: RAIZ, crashDumps: RAIZ, sessionData: RAIZ, module: RAIZ };
const eletronFalso = {
  app: Object.assign(eventos(), {
    whenReady: () => Promise.resolve(),
    getPath: (n) => { if (!(n in CAMINHOS)) throw new Error("path desconhecido: " + n); return CAMINHOS[n]; },
    getVersion: () => '0.0.0-teste', getName: () => 'PokeGrid', getAppPath: () => RAIZ, isPackaged: false,
    quit() {}, focus() {}, setAppUserModelId() {}, setLoginItemSettings() {},
    getLoginItemSettings: () => ({ openAtLogin: false }), requestSingleInstanceLock: () => true,
    userAgentFallback: 'Mozilla/5.0 Chrome/150.0.0.0 Electron/43.1.1 Safari/537.36',
    commandLine: { appendSwitch() {} }
  }),
  BrowserWindow: JanelaFalsa,
  // igual ao Electron: canal repetido LANCA. E isto que o incidente exigiu.
  ipcMain: {
    handle(canal) {
      if (registrados.has(canal)) throw new Error("Attempted to register a second handler for '" + canal + "'");
      registrados.add(canal);
    },
    on() {}, removeHandler(c) { registrados.delete(c); }
  },
  shell: { openExternal: () => Promise.resolve(), writeShortcutLink: () => true, showItemInFolder() {}, openPath: () => Promise.resolve('') },
  session: { defaultSession: { setPermissionRequestHandler() {} }, fromPartition: () => ({ setPermissionRequestHandler() {} }) },
  Menu: { buildFromTemplate: (t) => ({ items: t || [] }), setApplicationMenu() {} },
  Tray: function () { return Object.assign(eventos(), { setToolTip() {}, setContextMenu() {}, destroy() {} }); },
  dialog: { showMessageBox: () => Promise.resolve({ response: 1 }), showErrorBox() {} },
  safeStorage: { isEncryptionAvailable: () => false, encryptString: (s) => Buffer.from(s), decryptString: (b) => String(b) },
  powerSaveBlocker: { start: () => 1, stop() {}, isStarted: () => false },
  Notification: Object.assign(function () { return { show() {} }; }, { isSupported: () => true }),
  nativeImage: { createFromPath: () => ({ isEmpty: () => false }) },
  globalShortcut: { register: () => true, unregisterAll() {} },
  clipboard: { writeText() {} },
  screen: { getPrimaryDisplay: () => ({ workAreaSize: { width: 1920, height: 1080 } }) }
};
const Modulo = require('module');
const resolverOriginal = Modulo._resolveFilename;
Modulo._resolveFilename = function (pedido, ...resto) {
  if (pedido === 'electron') return 'electron-de-teste';
  return resolverOriginal.call(this, pedido, ...resto);
};
require.cache['electron-de-teste'] = { id: 'electron-de-teste', filename: 'electron-de-teste', loaded: true, exports: eletronFalso };
try { fs.mkdirSync(path.join(RAIZ, '.teste-tmp'), { recursive: true }); } catch {}
let carregou = true, erroCarga = '';
try { require(path.join(RAIZ, 'main.js')); } catch (e) { carregou = false; erroCarga = e.message; }
ok(carregou, 'main.js carrega sem estourar' + (carregou ? '' : ' -> ' + erroCarga));
ok(registrados.size === canais.length, 'todos os canais foram registrados uma vez (' + registrados.size + ')');

console.log('--- scripts injetados nos paineis parseiam ---');
const pega = (marca) => { const i = index.indexOf(marca); if (i < 0) return null; const ini = index.indexOf('`', i) + 1; return index.slice(ini, index.indexOf('`;', ini)); };
[['READ_STATE', 'READ_STATE = `'], ['READ_ALERTS', 'READ_ALERTS = `('], ['HUNTS_JS', 'const HUNTS_JS = `'], ['SELLGUARD', 'const SELLGUARD = `']].forEach(([nome, marca]) => {
  const cru = pega(marca);
  if (cru == null) { ok(false, nome + ' sumiu do index.html'); return; }
  // o template literal e desescapado antes de rodar no painel; aqui fazemos o mesmo
  try { new Function(eval('`' + cru.replace(/\$\{[^}]*\}/g, '0') + '`')); ok(true, nome + ' parseia'); }
  catch (e) { ok(false, nome + ' com erro: ' + e.message.slice(0, 70)); }
});

console.log('--- o <script> da interface parseia ---');
const re = /<script>([\s\S]*?)<\/script>/g; let m, maior = '';
while ((m = re.exec(index))) { if (m[1].length > maior.length) maior = m[1]; }
try { new Function(maior); ok(true, 'index.html parseia (' + maior.length + ' chars)'); }
catch (e) { ok(false, 'index.html nao parseia: ' + e.message.slice(0, 80)); }

try { fs.rmSync(path.join(RAIZ, '.teste-tmp'), { recursive: true, force: true }); } catch {}
console.log(falhas ? '\n' + falhas + ' falha(s)' : '\nInicializacao: tudo certo');
process.exit(falhas ? 1 : 0);
