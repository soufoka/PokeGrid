<div align="center">

<img src="tray.png" width="72" alt="PokeGrid">

# PokeGrid

**Quatro contas de Poke Idle World em uma janela só.**

[![Release](https://img.shields.io/github/v/release/soufoka/PokeGrid?color=e3350d)](https://github.com/soufoka/PokeGrid/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/soufoka/PokeGrid/total?color=3fb950)](https://github.com/soufoka/PokeGrid/releases/latest)
![Plataforma](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6)
![Electron](https://img.shields.io/badge/Electron-43-47848F)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](LICENSE)

[**Baixar**](https://github.com/soufoka/PokeGrid/releases/latest) · [English](README.en.md)

<img src="docs/screenshot.png" width="880" alt="PokeGrid rodando quatro contas ao mesmo tempo">

</div>

> Jogar idle com várias contas vira uma bagunça de janelas: quatro navegadores abertos, login manual em cada um e aquele jogo de adivinhar qual aba é qual. O PokeGrid junta tudo numa tela só, cada conta isolada da outra.

> ### 🔒 Seus dados de login ficam só no seu computador
> E-mail e senha são criptografados no seu próprio PC e nunca saem da máquina. Não vão para servidor nenhum, nem para este repositório, nem para mim. O código é aberto justamente pra você poder conferir.

## O que é

Quatro contas rodando ao mesmo tempo, cada uma no seu quadrante e com sessão separada. Você salva e-mail e senha uma vez e o app entra sozinho nas próximas. Se a sessão cair no meio do farm, ele loga de novo sem você precisar estar por perto.

Aba comum do navegador não dá conta porque todas dividem os mesmos cookies: entrar na segunda conta derruba a primeira. Janela anônima isola, mas você perde o login toda vez que fecha. Aqui as quatro convivem de boa e ficam à vista.

## O que ele faz

- Login automático, mesmo quando a sessão expira no meio do farm.
- Modo Eco: segura os jogos em 15 fps e derruba o uso de CPU sem atrapalhar o progresso.
- Liga e desliga cada painel pra devolver memória quando não estiver usando.
- Esconde o menu de ícones do jogo (tecla F2) e o chat, que só ocupam espaço.
- Fecha sozinho aquele popup de promoção que aparece todo login.
- Botão Hunt: abre e fecha o Hunt Analyzer nos quatro de uma vez.
- Impede o Windows de dormir enquanto você farma de madrugada.
- Vai pra bandeja perto do relógio e pode abrir junto com o Windows, já farmando.
- Português e inglês num clique, no app e no jogo.
- Zoom por painel, tela cheia e atalhos de teclado.

## Como usar

Baixe na [última versão](https://github.com/soufoka/PokeGrid/releases/latest) e escolha o formato:

- Windows: instalador (`Setup.exe`), portátil (`portable.exe`) ou compactado (`win.zip`).
- macOS: `arm64.dmg` (Apple Silicon) ou `.dmg` (Intel).
- Linux: `.AppImage`.

Abra, entre ou crie uma conta em cada painel e, em "Treinadores", salve e-mail e senha. Da próxima vez ele entra sozinho.

Rodando pelo código:

```bash
git clone https://github.com/soufoka/PokeGrid.git
cd PokeGrid
npm install
npm start
```

## Por dentro

Cada painel é um `<webview>` do Electron com partição própria (`persist:conta1` até `conta4`), e é isso que mantém as contas isoladas e logadas entre aberturas. O que o jogo não oferece, o app injeta em cada painel: o Eco troca o `requestAnimationFrame` por uma versão mais lenta, o login preenche pelo setter nativo do input (senão o React do jogo ignora), e o menu e o chat somem via CSS com um `MutationObserver` que reaplica quando o jogo redesenha a tela.

## Segurança

- As senhas são criptografadas pelo `safeStorage` do Electron, que usa a API do sistema (DPAPI no Windows). Nunca saem do PC.
- Os painéis ficam presos ao domínio do jogo. Link externo abre no seu navegador, e a senha só é digitada na tela de login oficial.
- Câmera, microfone, localização e notificações ficam bloqueados.
- O captcha é sempre você que resolve. O app preenche e aperta Entrar quando você marca a caixinha, mas nunca toca no "Confirme que é humano". Burlar detecção de bot não é a proposta.

## Licença

MIT. Projeto independente, sem ligação com o Poke Idle World.
