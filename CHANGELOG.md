# Changelog

## 1.0.0

### Novidades / Added
- Painéis abrem direto na tela de login, que rola sozinha até o captcha e o botão Entrar
  *Panels open straight on the login screen, auto-scrolled to the captcha and the Enter button*
- Login automático: preenche e-mail/senha e envia assim que você resolve o captcha
  *Auto login: fills credentials and submits as soon as you solve the captcha*
- 🎛 Menu do jogo: esconde a barra de ícones, alterna com **F2**
  *Game menu: hides the icon bar, toggled with **F2***
- 💬 Chat do jogo oculto por padrão, com toggle
  *Game chat hidden by default, with a toggle*
- Popup de promoção fechado automaticamente
  *Promo popup dismissed automatically*
- 🌐 Idioma PT/EN para a interface e para o jogo
  *PT/EN language switch for the app and the game*
- ☰ Opções: menu suspenso com Chat, Som, Eco, Dormir, Grade e Idioma
  *Options: dropdown with Chat, Sound, Eco, Sleep, Grid and Language*
- Modo Eco (15 fps), anti-sono, bandeja do sistema e início com o Windows
  *Eco mode (15 fps), keep-awake, system tray and start with Windows*
- Zoom, expandir e liga/desliga por painel
  *Per-panel zoom, expand and power toggle*

### Correções / Fixed
- Auto-login podia ressubmeter em loop com senha errada ou redirect; agora tem cooldown
  *Auto login could resubmit in a loop on wrong password or redirect; now rate-limited*
- Trocar de idioma podia bloquear o re-login após o reload
  *Switching language could block the re-login after the reload*
- F2 não respondia quando o foco estava na interface do app
  *F2 did not respond when focus was on the app UI*
- Contas salvas podiam ser perdidas se o arquivo ficasse ilegível; agora há backup e gravação atômica
  *Saved accounts could be lost if the file became unreadable; now backed up and written atomically*

### Segurança / Security
- Electron 43 (zero vulnerabilidades conhecidas) / *Electron 43 (no known vulnerabilities)*
- Senhas criptografadas via `safeStorage` do SO / *Passwords encrypted via the OS `safeStorage`*
- Painéis restritos ao domínio do jogo / *Panels restricted to the game's domain*
- Permissões de mídia e localização negadas / *Media and geolocation permissions denied*
