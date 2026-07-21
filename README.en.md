<div align="center">

<img src="tray.png" width="72" alt="PokeGrid">

# PokeGrid

**Four Poke Idle World accounts in a single window.**

[![Release](https://img.shields.io/github/v/release/soufoka/PokeGrid?color=e3350d)](https://github.com/soufoka/PokeGrid/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/soufoka/PokeGrid/total?color=3fb950)](https://github.com/soufoka/PokeGrid/releases/latest)
![Platform](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6)
![Electron](https://img.shields.io/badge/Electron-43-47848F)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**Download**](https://github.com/soufoka/PokeGrid/releases/latest) · [Português](README.md)

<img src="docs/screenshot.png" width="880" alt="PokeGrid running four accounts at once">

</div>

> Playing an idle game with several accounts turns into window chaos: four browsers open, each one logged in by hand, and then guessing which tab belongs to whom. PokeGrid puts them all on one screen, each account kept apart from the others.

> ### 🔒 Your login data stays only on your computer
> E-mail and password are encrypted on your own PC and never leave the machine. They go to no server, not to this repository, not to me. The code is open precisely so you can check.

## What it is

Four accounts running at once, each in its own quadrant with a separate session. You save the e-mail and password once and the app signs in on its own from then on. If a session drops mid farm, it logs back in without you being around.

Regular browser tabs do not cut it, since they all share the same cookies: logging into the second account kicks out the first. An incognito window isolates them but loses your login every time you close it. Here the four coexist just fine and stay in view.

## What it does

- Auto login, even when the session expires in the middle of a farm.
- Eco mode: holds the games at 15 fps and cuts CPU use without hurting progress.
- Turn each panel on or off to give memory back when you are not using it.
- Hides the game icon menu (F2 key) and the chat, which only eat space.
- Closes that promo popup that shows up on every login by itself.
- Hunt button: opens and closes the Hunt Analyzer in all four at once.
- Keeps Windows awake while you farm overnight.
- Goes to the tray near the clock and can start with Windows, already farming.
- Portuguese and English in one click, in the app and in the game.
- Per panel zoom, full screen and keyboard shortcuts.

## How to use

Grab the [latest release](https://github.com/soufoka/PokeGrid/releases/latest) and pick the format:

- Windows: installer (`Setup.exe`), portable (`portable.exe`) or archive (`win.zip`).
- macOS: `arm64.dmg` (Apple Silicon) or `.dmg` (Intel).
- Linux: `.AppImage`.

Open it, log in or create an account in each panel and, under "Treinadores" (Accounts), save the e-mail and password. Next time it signs in on its own.

Running from source:

```bash
git clone https://github.com/soufoka/PokeGrid.git
cd PokeGrid
npm install
npm start
```

## Under the hood

Each panel is an Electron `<webview>` with its own partition (`persist:conta1` to `conta4`), and that is what keeps the accounts isolated and logged in between launches. Whatever the game does not offer, the app injects into each panel: Eco swaps `requestAnimationFrame` for a slower version, the login fills through the input's native setter (otherwise the game's React ignores it), and the menu and chat disappear via CSS with a `MutationObserver` that reapplies when the game repaints.

## Security

- Passwords are encrypted by Electron's `safeStorage`, which uses the OS API (DPAPI on Windows). They never leave the PC.
- Panels are locked to the game's domain. An external link opens in your real browser, and the password is only typed into the official login page.
- Camera, microphone, location and notifications are blocked.
- You always solve the captcha. The app fills the fields and presses Enter when you tick the box, but it never touches the "Confirm you are human" widget. Beating bot detection is not the point.

## License

MIT. Independent project, not affiliated with Poke Idle World.
