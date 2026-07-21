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

> Jogar um idle com várias contas normalmente vira malabarismo de janelas: abrir quatro navegadores, logar em cada um na mão e depois adivinhar qual aba é qual. O PokeGrid junta tudo em uma tela só, com as sessões devidamente separadas.

## Por que isso existe

Poke Idle World é um jogo de progressão contínua, então faz sentido manter mais de uma conta rodando. O problema não é o jogo, é a logística em volta dele.

Abas comuns do navegador não resolvem, porque todas compartilham os mesmos cookies: entrar na segunda conta derruba a primeira. Janelas anônimas separadas resolvem o isolamento, mas aí você perde o login toda vez que fecha, gasta memória à toa e fica caçando qual janela pertence a quem.

O PokeGrid resolve os três de uma vez: isolamento real por conta, sessão que sobrevive ao fechamento do app, e tudo visível de uma vez em uma grade.

## Como funciona, em português claro

Cada painel é um navegador independente dentro da mesma janela. Eles não conversam entre si: têm cookies, armazenamento e login próprios, então as quatro contas convivem sem se atrapalhar.

Você salva o e-mail e a senha de cada conta uma vez. Nas próximas aberturas o app preenche o formulário sozinho e entra. Se a sessão cair no meio do farm, ele percebe e loga de novo sem você estar por perto.

Como quatro jogos rodando ao mesmo tempo pesam, o modo Eco limita cada painel a 15 quadros por segundo. Para um jogo idle isso não muda nada no progresso e derruba bastante o uso de processador.

## Recursos

- **Sessões isoladas.** Cada painel tem seus próprios cookies e login. As contas nunca se misturam.
- **Login automático.** Salve os dados uma vez. Ele entra sozinho, inclusive quando a sessão expira durante o farm.
- **Modo Eco.** Limita os jogos a 15 fps e corta o consumo de CPU e GPU sem afetar o progresso.
- **Liga e desliga por painel.** Descarrega a conta que não está em uso e devolve a memória na hora.
- **Menu do jogo ocultável.** A barra de ícones come espaço em painel pequeno. A tecla `F2` alterna.
- **Chat fechado por padrão.** Com um toggle para reabrir quando quiser.
- **Sem popup de promoção.** O anúncio que aparece a cada login é dispensado sozinho.
- **Anti-sono.** Impede o Windows de dormir enquanto você farma de madrugada.
- **Bandeja do sistema.** Minimiza para perto do relógio e pode iniciar junto com o Windows, já farmando.
- **Português e inglês.** Um clique troca o idioma da interface e também o do jogo.
- **Zoom por painel**, expandir para tela cheia e atalhos `Ctrl+1` a `Ctrl+4`.

## Começando

Baixe o arquivo do seu sistema na [última versão](https://github.com/soufoka/PokeGrid/releases/latest):

- **Windows** — `PokeGrid-Setup.exe` (instalador) ou `-portable.exe` (só abrir, sem instalar)
- **macOS** — `-arm64.dmg` (Apple Silicon) ou `.dmg` (Intel)
- **Linux** — `.AppImage`

1. Entre ou crie uma conta em cada painel.
2. Abra **Treinadores** e salve o e-mail e a senha de cada uma.

Pronto. Da próxima vez ele entra sozinho.

Rodando a partir do código:

```bash
git clone https://github.com/soufoka/PokeGrid.git
cd PokeGrid
npm install
npm start
```

## Arquitetura

Cada painel é uma tag `<webview>` do Electron com uma partição persistente própria (`persist:conta1` até `persist:conta4`). A partição é o que garante o isolamento: cookies, `localStorage` e sessão vivem em pastas separadas no disco, e é por isso que as contas não derrubam umas às outras e continuam logadas entre aberturas.

Os ajustes que o jogo não oferece são feitos por scripts injetados em cada painel:

| Recurso | Como é feito |
|---|---|
| Modo Eco | Substitui o `requestAnimationFrame` da página por uma versão com intervalo, limitando o frame rate |
| Login automático | Preenche os campos pelo setter nativo do `HTMLInputElement`, necessário para o React do jogo registrar a mudança |
| Menu do jogo e chat | Alternam a visibilidade dos elementos, com `MutationObserver` para reaplicar quando o jogo redesenha a interface |
| Popup de promoção | Aciona o próprio botão de fechar do jogo assim que ele aparece |

O `F2` é registrado dentro da página do jogo, e não como atalho de menu do Electron. Atalhos de menu não disparam enquanto o `webview` está com o foco do teclado, então essa é a única forma de a tecla responder enquanto você joga.

## Segurança

- **Senhas criptografadas no seu PC.** O `safeStorage` do Electron usa a API do próprio sistema operacional (DPAPI no Windows). As senhas nunca saem da máquina e nunca entram neste repositório.
- **Gravação atômica com backup.** O arquivo de contas é escrito em um temporário e trocado de uma vez, e um arquivo ilegível é preservado antes de qualquer sobrescrita.
- **Painéis presos ao domínio do jogo.** Qualquer link externo abre no seu navegador de verdade, e as credenciais só são digitadas na URL de login oficial.
- **Permissões negadas.** Microfone, câmera, localização e notificações ficam bloqueados para os painéis.
- **O captcha é sempre resolvido por você.** O app preenche os campos e aperta Entrar no momento em que você marca a caixinha, mas nunca toca no "Confirme que é humano". Contornar detecção de bot não é o objetivo deste projeto.

## Estrutura

```
PokeGrid/
├── main.js       processo principal: janela, bandeja, atalhos, IPC e cripto das contas
├── preload.js    ponte isolada entre a interface e o processo principal
├── index.html    interface, estado e os scripts injetados nos painéis
├── tray.png      ícone da bandeja
└── docs/         imagens do README
```

## Roadmap

Ideias que ainda não entraram, em ordem de utilidade:

- Vigia de queda: recarregar sozinho o painel que travar ou perder conexão, e avisar na bandeja
- Escolher quais painéis abrem ao iniciar, para farmar com menos de quatro contas
- Contador de tempo de farm por painel
- Lembrar o layout e o painel expandido entre aberturas

## Licença

[MIT](LICENSE). Projeto independente, sem afiliação com o Poke Idle World.
