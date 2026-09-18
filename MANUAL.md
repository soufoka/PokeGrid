# Manual do PokeGrid

Guia curto do que cada coisa faz. Se você só quer resolver um problema pontual, veja o [FAQ](FAQ.md).

## A barra do topo

| Botão | O que faz |
|---|---|
| **▶ Logar equipe** | Loga as 4 contas de uma vez, com as senhas salvas |
| **👤 Treinadores** | Cadastra e-mail e senha de cada conta. O 🗑 limpa o formulário; o 🧹 apaga os dados do jogo daquela conta (resolve conta bugada, a senha continua salva) |
| **⟳ Atualizar tudo** | Recarrega os painéis ligados, ignorando o cache (resolve tela de login velha presa) |
| **📊 Painel** | A barra lateral com os números da conta em foco (detalhes abaixo) |
| **🍃 Simples** | Esconde o jogo e mostra só os números das 4 contas. Gasta bem menos do PC |
| **IV's** | Abre a calculadora de IV. Passe o mouse num pokémon dentro do jogo que ela preenche sozinha |
| **☰ Opções** | Tudo o mais: Hunt, Tierlist, Ditto, Scripts, Alertas, Venda protegida, Eco, FAQ... |

Atalhos de teclado (só quando o foco está no app, não dentro do jogo): **H** Hunt, **C** Simples, **L** Limpar jogo, **R** Atualizar, **T** Treinadores, **G** Tierlist, **D** Ditto, **O** Opções, **M** menu do jogo, **E** Eco, **A** Alertas.

## 📊 Painel: a barra lateral

Mostra os números da conta que está em foco. Clique no painel de outra conta para trocar.

Na **engrenagem ⚙** do topo dela você escolhe **quais seções aparecem** e arrasta pra reordenar. Duas seções precisam de um passo antes de mostrar algo:

**📌 Itens fixados.** Serve para acompanhar a quantidade de um item específico em todas as contas ao mesmo tempo. Na engrenagem, procure o item (ou a pokébola) pelo nome e clique. Ele passa a aparecer na seção com o total de cada conta. Útil pra bola, revive, pena, o que você estiver juntando.

**🎯 Alvo shiny.** Serve para acompanhar a caçada de um shiny específico. Na engrenagem, em "Alvo shiny", busque a espécie. A seção passa a mostrar se ele **já apareceu**, se foi **capturado** e **quantas bolas** você gastou nele. Sem escolher a espécie, a seção fica vazia explicando isso (antes ela sumia, e parecia que a opção não funcionava).

## 🍃 Simples: o painel de todas as contas

O jogo some e ficam só os números das 4 contas. Serve pra deixar farmando gastando pouco do PC. Seções principais:

- **Hoje**: gold, XP, kills e capturas do dia, com meta e o botão que exporta as planilhas
- **Hunts**: o ranking. Ordene por **Sugerido** e escolha o atacante em **"caçar com"**. Golpe de TM só entra na conta se aquele pokémon aprendeu o disco. Com Ditto no time, aparece a melhor transformação por elemento, respeitando o que cada Ditto pode copiar (o Shiny só vira espécie com forma shiny) e sem TM, que Ditto não aprende
- **Capturas / Shinies**: histórico com filtros por conta, IV, qualidade e período
- **Inventário**: soma a mochila **e o depósito** das 4 contas
- **Tendência**: gráficos de gold/h e XP/h, e de gold/dia dos últimos 30 dias

## 🏆 Tierlist (Opções, ou tecla G)

Ranking de todas as espécies do jogo por elemento, nota de 0 a 100.

Escolha **seu nível** no topo da tierlist (vai até 3000): só entram as hunts que você alcança e só as espécies que dá pra ter nesse nível, caçando ou evoluindo. Cada pokémon é avaliado no nível de cada hunt, pra comparação entre espécies ser justa. A caixinha **com TM** inclui os golpes de TM (poder 600, Dragão 300); fica desligada por padrão porque TM é item. O golpe **físico** enfrenta a defesa física de cada hunt, o **especial** a defesa especial, e a **vida** do defensor segura o ritmo. A aba **Geral** compara todos os elementos juntos, e nela a nota é o rendimento somado em todas as hunts (quem rende em todo lugar vale mais que quem só brilha numa fraqueza ×4).

Na linha: **FÍS/ESP** é a categoria do golpe, **folga ×N** é quanto dano sobra além do necessário pra matar de um golpe (pesa na nota: quem mata no limite vale bem menos que quem mata com sobra), e **ORRE | OUT** são as melhores hunts em cada região, cada uma com sua nota. Hunts de **NIGHTMARE** (nível 2000 a 3000) levam esse rótulo na lista de hunts do Simples. Na tierlist elas só ganham linha quando são a de maior XP da espécie, o que hoje não acontece: o jogo paga menos XP nelas do que em Orre.

## ✨ Ditto (Opções, logo abaixo da Tierlist)

Onde caçar com um Ditto e em que pokémon virar. Escolha **Shiny** ou **Comum**, o **nível do Ditto** e o **nível da conta** (só entram hunts até esse nível; 0 mostra todas). **Meu Ditto…** preenche com um Ditto que esteja no time de uma conta ligada. Qualidade e IV não se escolhem: no jogo eles são fixos e iguais pra todo Ditto (comum 1.4 e 89, shiny 2.0 e 119), e o app usa esses.

**Por hunt** é o ranking das hunts, cada uma com a melhor transformação pra ela; **Por tipo** é a melhor forma de cada elemento e onde farmar com ela. A nota vai de 0 a 100 (100 = a melhor hunt da lista), com o golpe, a efetividade e a folga, como na tierlist. As regras são as do jogo: o Ditto não copia lendários, Mega, Nightmare, bosses de Orre nem Outland; o Shiny só vira espécie com forma shiny; nenhum usa TM. Os debuffs também entram na conta: Shiny Ditto -20% de Ataque e Sp. Atk (e -25% de HP e defesas, que não pesam no ranking), comum -25% de Ataque e defesas. A transformação do comum dura 12 h; a do shiny é permanente. Premissa do cálculo: o transformado usa as bases e os golpes da espécie copiada no nível do próprio Ditto.

## Proteções

- **🛡 Venda protegida**: pede confirmação antes de vender shiny, qualidade Lendária ou acima e itens raros. Na engrenagem do Painel dá pra travar seus próprios itens (**🔒 Cadeado de venda**)
- **🔔 Alertas**: avisa quando aparece shiny, uma conta cai, para de farmar, fica sem suprimento ou tem pokémon derrubado. Na engrenagem do Simples você escolhe quais tipos avisam no Windows, um por um. Com webhook do Discord configurado, o aviso também chega no celular
- **💾 Exportar/Importar config**: leva suas configurações e seu histórico pra outro PC. Scripts e webhook ficam de fora, de propósito. Importar troca o histórico pelo do arquivo e guarda uma cópia do seu antes. O app também salva um backup sozinho toda semana em `%APPDATA%\pokegrid\backups`, a mesma pasta do `hunts-historico.csv` (as hunts que passam das 150 guardadas) e do `hunts-historico-drops.csv`

## Coisas que confundem no começo

- **A opção marcada não mudou nada?** Provavelmente é uma seção que precisa de configuração (Fixados e Alvo shiny). Elas agora dizem isso na tela
- **Não consigo trocar a pokébola**: é o **🧼 Limpar jogo** escondendo o Auto-Helper. Passe o mouse no canto que ele aparece
- **O ouro da sessão**: desde a 1.5.16 vem do próprio servidor do jogo, então é o mesmo número do Hunt Analyzer
- **Conta travada quando saio do PC**: corrigido na 1.5.16; atualize
