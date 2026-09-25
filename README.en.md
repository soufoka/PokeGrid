<div align="center">

<img src="tray.png" width="72" alt="PokeGrid">

# PokeGrid

**Four Poke Idle World accounts in a single window.**

[![Download](https://img.shields.io/badge/Download-latest%20version-e3350d)](https://github.com/soufoka/PokeGrid/releases/latest)
![Platform](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6)
![Electron](https://img.shields.io/badge/Electron-43-47848F)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**Download**](https://github.com/soufoka/PokeGrid/releases/latest) · [Português](README.md)

<img src="docs/modo-simples.png" width="880" alt="Simple mode: dashboard with the numbers of all four accounts">

<sub>Simple mode: hides the game and shows only the numbers. Every section can be moved and resized.</sub>

</div>

> ### 🔒 Your login data stays only on your computer
> Login and password are encrypted on your own PC and never leave it. No server, no repository. The whole code is here for you to check.

## What it is

Four accounts running at once, each in its own quadrant with a separate session. You save the login once and the app signs in on its own from then on. If a session drops mid farm, it logs back in without you being around. It does not automate the game or touch the captcha, it only organizes the accounts you already have.

## How to install

On the [latest release](https://github.com/soufoka/PokeGrid/releases/latest), under **Assets**, download the file for your system:

- Windows: `PokeGrid-Setup-….exe` (installer), `PokeGrid-…-portable.exe` (portable, runs without installing) or `PokeGrid-…-win.zip` (extract and run).
- macOS: `PokeGrid-…-arm64.dmg` (Apple chip Macs, M1 and later) or `PokeGrid-….dmg` (Intel Macs).
- Linux: `PokeGrid-….AppImage`.

Open it, log in or create an account in each panel and, under **👤 Treinadores** (Accounts), save the login. Next time it signs in on its own.

> **Windows says "Windows protected your PC"?** That is the SmartScreen warning for programs without a digital signature: the certificate costs money, and the project is free. Click **More info** and then **Run anyway**. If the browser holds the download, choose **Keep**. Every version comes from a public build on GitHub Actions, with the Windows Defender scan in its log. Only download it from here, github.com/soufoka.

> **On a Mac, it says the app can't be opened?** Open **System Settings > Privacy & Security** and click **Open Anyway**. If it says the app is damaged, run `xattr -cr /Applications/PokeGrid.app` in Terminal and open it again. Same reason as on Windows: the app has no Apple signature.

When a new version is out, the app tells you when it opens, and its **Download** button brings you back to the download page. Install over the old one, or swap the portable for the new one: accounts, settings, scripts and history live outside the program and stay where they are.

On Linux, if the AppImage only opens with `--no-sandbox`, see the [FAQ](FAQ.md) (Portuguese).

> Rather not run an executable? The [no-executable version](https://github.com/soufoka/PokeGrid-source) is the same app running straight from the code: you download it, check what it does and open it with Node.js.

## What it does

- Run 1 to 4 accounts, you choose how many panels to open.
- Auto login, even when the session expires in the middle of a farm.
- 🍃 Simple view: hides the games and shows only the accounts' numbers (gold and XP per hour, daily totals, catches, shinies, inventory), using much less of the PC.
- Tierlist by element and by Pokémon, hunt suggestions and the Ditto panel, which adjust to what your accounts farm.
- IV calculator and sell guard, which asks before selling a shiny, a Legendary or a rare item.
- Alerts on shiny, dropped account, stopped farming and low supplies, as a notification and on Discord.
- Eco mode that keeps CPU use down without hurting progress, and hides the chat and the game icon menu to free up screen.
- Turn each panel on or off, per panel zoom and expand, and keyboard shortcuts.
- Tray, start with Windows, and Portuguese, English or Spanish.

## Documentation

| | |
|---|---|
| **[Manual](MANUAL.md)** | What every button and panel section does (Portuguese) |
| **[FAQ](FAQ.md)** | Common questions: updating without losing anything, antivirus warnings, the missing pokéball, scripts, spreadsheets (Portuguese) |
| **[Changelog](CHANGELOG.md)** | What landed in each version |

## Security

- Passwords are encrypted by Electron's `safeStorage`, which uses the OS API (DPAPI on Windows). They never leave the PC.
- Panels are locked to the game's domain. An external link opens in your real browser, and the password is only typed into the official login page.
- The game's camera, microphone, location and notifications are blocked.
- You always solve the captcha. The app fills the fields and presses Enter when you tick the box, but it never touches the "Confirm you are human" widget. Beating bot detection is not the point.

## Under the hood

Each panel is an Electron `<webview>` with its own partition (`persist:conta1` to `conta4`), and that is what keeps the accounts isolated and logged in between launches. Whatever the game does not offer, the app injects into each panel: Eco swaps `requestAnimationFrame` for a slower version, the login fills through the input's native setter, and the menu and chat disappear via CSS with a `MutationObserver`. It is all in `main.js`, `preload.js` and `index.html`, nothing hidden.

## License

MIT. Independent project, not affiliated with Poke Idle World.
