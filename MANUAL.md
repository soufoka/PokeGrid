# Manual do PokeGrid

Guia curto do que cada coisa faz. Se você só quer resolver um problema pontual, veja o [FAQ](FAQ.md).

## A barra do topo

| Botão | O que faz |
|---|---|
| **▶ Logar equipe** | Loga as 4 contas de uma vez, com as senhas salvas |
| **👤 Treinadores** | Cadastra e-mail e senha de cada conta. O 🗑 limpa o formulário; o 🧹 apaga os dados do jogo daquela conta (resolve conta bugada, a senha continua salva) |
| **⟳ Atualizar tudo** | Recarrega os 4 painéis |
| **📊 Painel** | A barra lateral com os números da conta em foco (detalhes abaixo) |
| **🍃 Simples** | Esconde o jogo e mostra só os números das 4 contas. Gasta bem menos do PC |
| **IV's** | Abre a calculadora de IV. Passe o mouse num pokémon dentro do jogo que ela preenche sozinha |
| **☰ Opções** | Tudo o mais: Hunt, Tierlist, Scripts, Alertas, Venda protegida, Eco, FAQ... |

Atalhos de teclado (só quando o foco está no app, não dentro do jogo): **H** Hunt, **C** Simples, **L** Limpar jogo, **R** Atualizar, **T** Treinadores, **G** Tierlist, **O** Opções, **M** menu do jogo.

## 📊 Painel: a barra lateral

Mostra os números da conta que está em foco. Clique no painel de outra conta para trocar.

Na **engrenagem ⚙** do topo dela você escolhe **quais seções aparecem** e arrasta pra reordenar. Duas seções precisam de um passo antes de mostrar algo:

**📌 Itens fixados.** Serve para acompanhar a quantidade de um item específico em todas as contas ao mesmo tempo. Na engrenagem, procure o item (ou a pokébola) pelo nome e clique. Ele passa a aparecer na seção com o total de cada conta. Útil pra bola, revive, pena, o que você estiver juntando.

**🎯 Alvo shiny.** Serve para acompanhar a caçada de um shiny específico. Na engrenagem, em "Alvo shiny", busque a espécie. A seção passa a mostrar se ele **já apareceu**, se foi **capturado** e **quantas bolas** você gastou nele. Sem escolher a espécie, a seção fica vazia explicando isso (antes ela sumia, e parecia que a opção não funcionava).

## 🍃 Simples: o painel de todas as contas

O jogo some e ficam só os números das 4 contas. Serve pra deixar farmando gastando pouco do PC. Seções principais:

- **Hoje**: gold, XP, kills e capturas do dia, com meta e o botão que exporta as planilhas
- **Hunts**: o ranking. Ordene por **Sugerido** e escolha o atacante em **"caçar com"**. Com Ditto no time, aparece a melhor transformação por elemento
- **Capturas / Shinies**: histórico com filtros por conta, IV, qualidade e período
- **Inventário**: soma a mochila **e o depósito** das 4 contas
- **Tendência**: gráficos de gold/h e XP/h, e de gold/dia dos últimos 30 dias

## 🏆 Tierlist (Opções, ou tecla G)

Ranking de todas as espécies do jogo por elemento, nota de 0 a 100.

Escolha **seu nível** no topo da tierlist: cada pokémon é avaliado nesse nível e só entram as hunts que você alcança (nada de recomendar um lugar acima do seu nível). O golpe **físico** enfrenta a defesa física de cada hunt, o **especial** a defesa especial, e a **vida** do defensor segura o ritmo. A aba **Geral** compara todos os elementos juntos, e nela a nota é o rendimento somado em todas as hunts (quem rende em todo lugar vale mais que quem só brilha numa fraqueza ×4).

Na linha: **FÍS/ESP** é a categoria do golpe, **folga ×N** é quanto dano sobra além do necessário pra matar de um golpe, e **ORRE | OUT** são as melhores hunts em cada região, cada uma com sua nota.

## Proteções

- **🛡 Venda protegida**: pede confirmação antes de vender shiny, qualidade Lendária ou acima e itens raros. Na engrenagem do Painel dá pra travar seus próprios itens (**🔒 Cadeado de venda**)
- **🔔 Alertas**: avisa quando uma conta cai, fica sem pokébola ou para de farmar. Com webhook do Discord configurado, o aviso chega no celular
- **💾 Exportar/Importar config**: leva suas configurações pra outro PC. O app também salva um backup sozinho toda semana

## Coisas que confundem no começo

- **A opção marcada não mudou nada?** Provavelmente é uma seção que precisa de configuração (Fixados e Alvo shiny). Elas agora dizem isso na tela
- **Não consigo trocar a pokébola**: é o **🧼 Limpar jogo** escondendo o Auto-Helper. Passe o mouse no canto que ele aparece
- **O ouro da sessão**: desde a 1.5.16 vem do próprio servidor do jogo, então é o mesmo número do Hunt Analyzer
- **Conta travada quando saio do PC**: corrigido na 1.5.16; atualize
