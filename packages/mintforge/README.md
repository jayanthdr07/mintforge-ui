# mintforge

> Official CLI for **Mintforge UI** — The universal, AI-native component system for Web & Mobile.

[![npm version](https://img.shields.io/npm/v/mintforge.svg?color=10b981)](https://www.npmjs.com/package/mintforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)

## Quick Start

Initialize Mintforge in your Next.js or React project:

```bash
npx mintforge init
```

Add components directly to your source code:

```bash
npx mintforge add button card dialog
```

## Commands

- `npx mintforge init` — Sets up `components.json`, creates `lib/utils.ts`, and prepares the `components/ui` folder.
- `npx mintforge add <components...>` — Adds one or more components to `components/ui/`.
- `npx mintforge list` — Displays all available primitives, blocks, and mobile components.
- `npx mintforge diff <component>` — Compares your local component with upstream registry.

## Why Mintforge?

- **Zero Lock-In**: Own 100% of the code. Components are dropped directly into your codebase.
- **Universal**: Designed for both **Web (React/Next.js)** and **Mobile (React Native/Expo)**.
- **AI-Agent Ready**: Built-in schemas and rules for Claude Code, Cursor, Windsurf, and Antigravity.
- **Aesthetic**: Signature emerald/mint dark mode design tokens.

## License

MIT © [Rakshith Kumar](https://github.com/rakshithkumar608)
