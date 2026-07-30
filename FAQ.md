# PokeGrid: perguntas frequentes

## Instalação e atualização

### Atualizar apaga minhas configurações e scripts?
Não. Tudo fica em `%APPDATA%\pokegrid`, fora do programa. Atualizar, reinstalar ou trocar de versão não mexe nessa pasta.

### Existe um config.ini?
Não. Backup = copiar a pasta `%APPDATA%\pokegrid`. Só as senhas não migram pra outro PC (são criptografadas pelo Windows); o resto vai junto.

### O processo abre mas a janela não aparece
Bug das versões 1.5.5 a 1.5.9, corrigido na **1.5.10**. Baixe a mais recente: https://github.com/soufoka/PokeGrid-source

### Qual navegador o app usa?
Electron (Chromium, o motor do Chrome). Cada conta roda numa sessão separada.

## Uso diário

### Onde vejo a sugestão de hunts?
**Simples → seção Hunts**: ordene por **Sugerido** e escolha o atacante no **"caçar com"**. Com Ditto no time, aparece a melhor transformação por elemento. As estimativas de kills/h e XP/h surgem depois que o app mede algumas hunts suas.

### Mudo um filtro e nada acontece / painel demora
Bug corrigido na **1.5.11**: o painel segurava a atualização enquanto o foco ficava no seletor. Fora isso, o Simples atualiza a cada 10s de propósito, pra pesar menos.

### Não consigo mudar a pokébola!
É o "sabonete": o botão **🧼 Limpar jogo** (ligado por padrão) esconde o Auto-Helper do jogo, que é onde fica o seletor de pokébola. Clique no 🧼 na barra do topo pra desligar, troque a bola no Auto-Helper e ligue de novo.

### Como desabilito um script?
**Opções → Scripts**, desmarque a caixinha. Desde a 1.5.11 isso recarrega as contas e o script para na hora. Antes: desmarque e clique em **⟳ Atualizar tudo**.

### Como exporto os logs de hunt?
**Simples → Hoje → "⬇ Hunts (N)"**. Baixa duas planilhas (hunts e drops) que abrem direto no Excel. O app guarda as últimas 150 hunts.

### E o captcha?
O app nunca resolve captcha. É sempre você, na janela da conta. Proposital, não vai mudar.

### Como funciona a proteção de venda?
Com o escudo ligado, o app pede confirmação antes de vender shiny, qualidade Lendária ou acima e itens raros. Desde a 1.5.11 dá pra travar seus próprios itens na engrenagem do painel (**🔒 Cadeado de venda**).

## Projeto

### Como contribuo?
Fork de https://github.com/soufoka/PokeGrid-source, rode `npm test` e abra o PR. A `main` é protegida, tudo entra por PR.
