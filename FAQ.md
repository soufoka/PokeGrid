# PokeGrid: perguntas frequentes

## Instalação e atualização

### Atualizar apaga minhas configurações e scripts?
Não. Tudo fica em `%APPDATA%\pokegrid`, fora do programa. Atualizar, reinstalar ou trocar de versão não mexe nessa pasta.

### Existe um config.ini?
Não. Backup = copiar a pasta `%APPDATA%\pokegrid`. Só as senhas não migram pra outro PC (são criptografadas pelo Windows); o resto vai junto.

### O processo abre mas a janela não aparece
Bug das versões 1.5.5 a 1.5.9, corrigido na **1.5.10**. Baixe a mais recente: https://github.com/soufoka/PokeGrid-source

### O Windows ou o navegador dizem que o app é vírus
São dois avisos diferentes, e nenhum é vírus.

**"O Windows protegeu o PC" ou "não é baixado com frequência"**, no instalador: é o aviso padrão para programa **sem assinatura digital** (o certificado custa, e o projeto é gratuito). O código é aberto e cada versão sai de uma compilação pública no GitHub Actions, com o resultado do Windows Defender no log. Pra instalar: clique em **Mais informações** e depois em **Executar assim mesmo**; no navegador, **Manter**.

**"Ameaça bloqueada: Trojan:Script/Wacatac.H!ml"**, no zip do código-fonte, com o download que não termina: é um falso positivo do Windows Defender na hora do download, que começou em 22/09/2026. Os scripts do projeto e o instalador dão zero detecção no VirusTotal, inclusive no antivírus da Microsoft. O suspeito é o antigo lançador `Abrir PokeGrid.vbs`, um VBS que abria o terminal escondido: o mesmo padrão já fez o zip de outros projetos ser barrado. Ele foi trocado na 1.5.25 por um `.bat`. Enquanto a Microsoft não libera, dá pra baixar o **instalador** na página de versões, ou abrir **Segurança do Windows → Proteção contra vírus e ameaças → Histórico de proteção**, clicar no aviso, escolher **Ações → Permitir no dispositivo** e baixar de novo. Faça isso só com o arquivo baixado de **github.com/soufoka**.

### A tierlist, o Sugerido e o painel do Ditto ficam vazios
Bug das versões 1.5.5 a 1.5.23 do instalador, da portátil e do zip: um arquivo do app ficava fora do pacote e essas telas não tinham como calcular. Corrigido na **1.5.24**. Quem roda pelo código-fonte nunca teve o problema.

### Qual navegador o app usa?
Electron (Chromium, o motor do Chrome). Cada conta roda numa sessão separada.

## Uso diário

### Onde vejo a sugestão de hunts?
**Simples → seção Hunts**: ordene por **Sugerido** e escolha o atacante no **"caçar com"**. Com Ditto no time, aparece a melhor transformação por elemento. As estimativas de kills/h e XP/h surgem depois que o app mede algumas hunts suas.

### Tenho um Shiny Ditto: onde caço e em que viro?
**☰ Opções → ✨ Ditto** (logo abaixo da Tierlist). Escolha shiny ou comum, o nível do Ditto e o nível da conta (qualidade e IV são fixos no jogo, o app já usa os certos); **Meu Ditto…** preenche com o Ditto do seu time. **Por hunt** lista as hunts da melhor pra pior, cada uma com a forma certa pra ela; **Por tipo** mostra a melhor forma de cada elemento. Só entram formas que o jogo deixa o Ditto copiar (o shiny só vira espécie com forma shiny), sem TM, e com o debuff do jogo na conta.

### Mudo um filtro e nada acontece / painel demora
Bug corrigido na **1.5.11**: o painel segurava a atualização enquanto o foco ficava no seletor. Fora isso, o Simples atualiza a cada 10s de propósito, pra pesar menos.

### Não consigo mudar a pokébola!
É o "sabonete": o botão **🧼 Limpar jogo** esconde o Auto-Helper do jogo, que é onde fica o seletor de pokébola. Desde a 1.5.13 basta **passar o mouse** no canto onde ele fica que ele aparece; em versões antigas, desligue o 🧼 na barra do topo, troque a bola e ligue de novo.

### Como desabilito um script?
**Opções → Scripts**, desmarque a caixinha. Desde a 1.5.11 isso recarrega as contas e o script para na hora. Antes: desmarque e clique em **⟳ Atualizar tudo**.

### Como exporto os logs de hunt?
**Simples → Hoje → "⬇ Hunts (N)"**. Baixa duas planilhas (hunts e drops) que abrem direto no Excel. O app guarda as últimas 150 hunts; as mais antigas ficam em `%APPDATA%\pokegrid\backups\hunts-historico.csv` (e `hunts-historico-drops.csv` pros drops por item).

### O ouro da sessão não bate com o Hunt Analyzer do jogo
A partir da 1.5.16 bate: o app passou a usar os números do próprio servidor do jogo, os mesmos que o Hunt Analyzer mostra. Antes ele refazia a conta por fora e errava em coisas que só o servidor sabe (qual pokébola foi usada em cada arremesso, se o pokémon novo veio de captura ou do mercado, se a poção saiu por uso ou por venda). Se ainda houver diferença, lembre que o relógio do Hunt Analyzer zera ao trocar de hunt e no 🗑 dele, e nenhum dos dois mede o ouro real da carteira: os dois mostram o valor do que caiu, a preço de NPC.

### O app recarregou um painel e a conta ficou parada na cidade
É o jogo: toda vez que a página recarrega, ele coloca a conta em Cerulean. O app recarrega sozinho quando um painel trava ou cai. Em **☰ Opções** existe o **↩ Voltar pra hunt** (experimental, desligado por padrão): ligado, o app manda a conta de volta pra mesma hunt 12 segundos depois do recarregamento (e repete a cada 12 s, até 3 vezes, enquanto não houver kill), desde que ela tenha matado algo nos últimos 10 minutos. A tela do jogo pode continuar mostrando a cidade enquanto a conta farma; os números do Painel e do Simples são os do servidor.

### E o captcha?
O app nunca resolve captcha. É sempre você, na janela da conta. Proposital, não vai mudar.

### Ativei o 2FA no jogo, o app funciona?
Funciona. O app preenche e-mail e senha e para ali. Depois da senha o jogo pede o código do autenticador na janela da conta: você digita, igual ao captcha. O app nunca toca no código.

### Como funciona a proteção de venda?
Com o escudo ligado, o app pede confirmação antes de vender shiny, qualidade Lendária ou acima e itens raros. Desde a 1.5.11 dá pra travar seus próprios itens na engrenagem do painel (**🔒 Cadeado de venda**).

## Projeto

### Como apoio o projeto?
Pelo botão **Ajude o projeto** ao lado do logo, no topo do app, ou direto em https://link.mercadopago.com.br/pokegrid (Pix e cartão). Apoio é opcional e não desbloqueia nada; o app é e continua gratuito. **Esse é o único link oficial**: desconfie de qualquer outro.


### Como contribuo?
Fork de https://github.com/soufoka/PokeGrid-source, rode `npm test` e abra o PR. A `main` é protegida, tudo entra por PR.
