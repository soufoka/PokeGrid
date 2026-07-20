<div align="center">

<img src="tray.png" width="72" alt="PokeGrid">

# PokeGrid

**4 contas de Poke Idle World ao mesmo tempo, numa janela só.**
**4 Poke Idle World accounts at once, in a single window.**

Feito com Electron · Windows · [Poke Idle World](https://poke.idleworld.online/)

[**⬇️ Baixar / Download**](https://github.com/soufoka/PokeGrid/releases/latest)

<img src="docs/screenshot.png" width="900" alt="PokeGrid rodando 4 contas ao mesmo tempo">

</div>

---

## 🇧🇷 Português

Jogar idle com várias contas normalmente significa abrir várias janelas do navegador, entrar em cada uma na mão e ficar caçando qual aba é qual. O PokeGrid resolve isso: **uma janela, quatro painéis, quatro contas independentes**, cada uma com sua própria sessão isolada.

### Recursos

| | |
|---|---|
| 🔐 **Sessões isoladas** | Cada painel tem cookies e login próprios. As contas nunca se misturam. |
| ⚡ **Login automático** | Salve e-mail e senha uma vez e ele entra sozinho, inclusive se a sessão cair no meio do farm. |
| 🔋 **Modo Eco** | Limita os jogos a 15 fps. Corta muito CPU/GPU sem afetar o farm. |
| ⏻ **Liga/desliga por painel** | Descarrega a conta que você não está usando e devolve a memória. |
| 🎛 **Menu do jogo** | Esconde a barra de ícones do jogo, que come espaço em painel pequeno. **F2** alterna. |
| 💬 **Chat oculto** | O chat do jogo começa fechado, com toggle para reabrir. |
| 🚫 **Sem popup de promoção** | O anúncio que aparece a cada login é fechado sozinho. |
| ☕ **Anti-sono** | Impede o Windows de dormir enquanto farma de madrugada. |
| 🔴 **Bandeja** | Minimiza para o relógio e pode iniciar junto com o Windows, já farmando. |
| 🌐 **PT / EN** | Um clique troca o idioma do app **e** do jogo. |

### Como usar

1. Baixe o `.zip` da versão portátil, extraia e abra o `PokeGrid.exe`.
2. Entre ou crie uma conta em cada painel.
3. Em **Treinadores**, salve o e-mail e a senha de cada conta.

Pronto. Nas próximas vezes ele entra sozinho.

> **Rodando pelo código:** `npm install` e depois `npm start`.

### Segurança

- As senhas ficam **criptografadas no seu PC** com a API do próprio sistema operacional (DPAPI no Windows), via `safeStorage` do Electron. Nunca saem da máquina e nunca vão para o repositório.
- Os painéis ficam **presos ao domínio do jogo**: qualquer link externo abre no seu navegador, e as credenciais só são digitadas na URL de login oficial.
- Microfone, câmera, localização e notificações ficam **negados** para os painéis.
- **O captcha é sempre resolvido por você.** O app preenche os dados e aperta "Entrar" assim que você marca a caixinha, mas não toca no "Confirme que é humano". Contornar detecção de bot não é o objetivo do projeto.

### Como funciona

Cada painel é um `<webview>` do Electron com uma partição persistente própria (`persist:conta1..4`), que é o que garante o isolamento das sessões. O modo Eco intercepta o `requestAnimationFrame` da página para limitar o frame rate. O login automático preenche o formulário usando o setter nativo do `HTMLInputElement`, necessário para que o React do jogo registre a mudança.

---

## 🇺🇸 English

Playing an idle game with several accounts usually means juggling browser windows, logging into each one by hand, and guessing which tab is which. PokeGrid fixes that: **one window, four panels, four independent accounts**, each with its own isolated session.

### Features

| | |
|---|---|
| 🔐 **Isolated sessions** | Every panel has its own cookies and login. Accounts never mix. |
| ⚡ **Auto login** | Save e-mail and password once and it signs in by itself, even if the session drops mid-farm. |
| 🔋 **Eco mode** | Caps the games at 15 fps. Big CPU/GPU savings with no effect on farming. |
| ⏻ **Per-panel power** | Unload an account you are not using and get the memory back. |
| 🎛 **Game menu** | Hides the game icon bar that eats space in a small panel. **F2** toggles it. |
| 💬 **Chat hidden** | The game chat starts closed, with a toggle to bring it back. |
| 🚫 **No promo popup** | The ad shown on every login is dismissed automatically. |
| ☕ **Keep awake** | Stops Windows from sleeping while you farm overnight. |
| 🔴 **Tray** | Minimizes to the clock and can start with Windows, already farming. |
| 🌐 **PT / EN** | One click switches the language of the app **and** the game. |

### Getting started

1. Download the portable `.zip`, extract it and open `PokeGrid.exe`.
2. Log in or create an account in each panel.
3. Under **Treinadores** (Accounts), save each account's e-mail and password.

That's it. From then on it logs in on its own.

> **From source:** `npm install`, then `npm start`.

### Security

- Passwords are **encrypted on your machine** using the OS keychain (DPAPI on Windows) through Electron's `safeStorage`. They never leave the computer and never reach this repository.
- Panels are **locked to the game's domain**: any external link opens in your real browser, and credentials are only typed into the official login URL.
- Microphone, camera, geolocation and notifications are **denied** for the panels.
- **You always solve the captcha.** The app fills the fields and presses "Enter" the moment you tick the box, but it never touches the "Confirm you are human" widget. Defeating bot detection is not what this project is for.

### How it works

Each panel is an Electron `<webview>` with its own persistent partition (`persist:conta1..4`), which is what keeps sessions isolated. Eco mode patches the page's `requestAnimationFrame` to throttle the frame rate. Auto login fills the form through the native `HTMLInputElement` value setter, which is required for the game's React state to register the change.

---

<div align="center">

MIT · não é afiliado ao Poke Idle World / not affiliated with Poke Idle World

</div>
