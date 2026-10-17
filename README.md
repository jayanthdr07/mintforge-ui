# Mintforge UI

**An open-source UI ecosystem for React, Next.js, and React Native.**

<!-- Project status -->
![Status](https://img.shields.io/badge/status-in%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)

<!-- Tech stack -->
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)

<!-- GitHub repository -->
[![GitHub stars](https://img.shields.io/github/stars/rakshithkumar608/mintforge-ui?style=flat)](https://github.com/rakshithkumar608/mintforge-ui/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rakshithkumar608/mintforge-ui?style=flat)](https://github.com/rakshithkumar608/mintforge-ui/forks)
[![GitHub issues](https://img.shields.io/github/issues/rakshithkumar608/mintforge-ui)](https://github.com/rakshithkumar608/mintforge-ui/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/rakshithkumar608/mintforge-ui)](https://github.com/rakshithkumar608/mintforge-ui/pulls)
[![Last commit](https://img.shields.io/github/last-commit/rakshithkumar608/mintforge-ui)](https://github.com/rakshithkumar608/mintforge-ui/commits/main)

<!-- npm package -->
[![npm version](https://img.shields.io/npm/v/mintforge?color=10b981&label=npm%20package)](https://www.npmjs.com/package/mintforge)
[![npm downloads](https://img.shields.io/npm/dm/mintforge?color=10b981)](https://www.npmjs.com/package/mintforge)

Mintforge UI is a developer-focused project for building reusable, customizable UI components and ready-to-use interface blocks for web and mobile applications.

The goal is to help developers build consistent user interfaces faster, with components they can explore, install, customize, and use in their own projects.

## Quick Start (CLI)

Add components directly into any React or Next.js project using the official `mintforge` CLI:

```bash
# 1. Initialize Mintforge in your project
npx mintforge init

# 2. Add components directly to your codebase
npx mintforge add button card dialog input tabs badge

# 3. Verify frontend forms against backend FastAPI models (Seam Check)
npx mintforge check
```

## What We're Building

### 1. UI Component Library

A collection of reusable components for React and Next.js, including:

- Buttons, inputs, forms, and dropdowns
- Cards, dialogs, tabs, and tooltips
- Navigation, sidebars, and tables
- Layout components and other common UI elements

### 2. UI Blocks and Templates

Ready-to-use interface sections and larger layouts for common application needs, including:

- Authentication pages
- Admin dashboards
- Settings pages
- Data tables and management interfaces
- SaaS application layouts and reusable workflows

### 3. Full-Stack Seam Verification (Seam Check)

A zero-codegen contract verification engine and GitHub Action (`npx mintforge check`) that eliminates runtime mismatches between your frontend (Next.js / Expo / React) and backend (FastAPI / Pydantic):

- **Schema Drift**: Catches missing fields, extra fields, optional vs required conflicts, and type mismatches between Pydantic and Zod.
- **Endpoint Drift**: Verifies that every `fetch` and `axios` call targets an active FastAPI route path and HTTP method.
- **Payload Drift**: Flags mismatched keys and casing issues (`camelCase` vs `snake_case`) before deploying to production.

### 4. React Native Components

A dedicated collection of mobile UI components for React Native and Expo, following a consistent design approach with the web library wherever practical.

### 5. Component Documentation Website

A central website where developers will be able to:

- Browse and search components
- Preview components and explore examples
- Read installation, usage, and Seam Check instructions
- Copy code and customize components
- Discover blocks and templates

### 6. Component Installation and Customization

The project aims to make components straightforward to integrate into existing applications. Source-based installation and a CLI or registry may be introduced as the library develops.

## Design Philosophy

Mintforge UI aims to provide:

- **Simple and consistent design** — clean interfaces with thoughtful spacing, typography, and neutral colors.
- **Customization** — components developers can adapt to their requirements.
- **Developer experience** — clear documentation and practical examples.
- **Reusable patterns** — components and blocks designed for real application interfaces.
- **Web and mobile support** — a consistent design language across supported platforms.
- **Open-source collaboration** — a project developers can inspect, improve, and contribute to.

## Technology Stack

The initial website uses:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

The project may use additional libraries as implementation needs evolve. React Native, component distribution tooling, and other supporting packages will be introduced as development progresses.

## Getting Started

### Prerequisites

- Node.js compatible with the project's Next.js version
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/rakshithkumar608/mintforge-ui.git
cd mintforge-ui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

The initial application follows the Next.js App Router structure.

```text
mintforge-ui/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   └── ui/
│   └── lib/
├── .github/
├── LICENSE
├── README.md
├── package.json
└── tsconfig.json
```

The structure may evolve as the component library, documentation website, and mobile packages are developed.

## Project Status

Mintforge UI is in early development. The initial focus is establishing the project foundation, design system, website, and component browsing experience.

The component library, React Native collection, installation workflow, and supporting tools will be developed progressively. Features will be documented as they become available.

## Contributing

Contributions, suggestions, bug reports, and discussions are welcome.

Before contributing:

1. Check existing issues to avoid duplicating work.
2. Open an issue to discuss significant changes before implementing them.
3. Submit changes through a pull request.
4. Follow the repository's contribution guidelines when available.

## Reporting Issues

If you find a bug or have an idea for an improvement, open an issue in the GitHub repository.

Please include enough detail to understand the problem, steps to reproduce it, and the expected behavior.

## Security

Please do not disclose security vulnerabilities in public issues. Add a `SECURITY.md` file with private reporting instructions as the project establishes its security policy.

## License

Mintforge UI is intended to be released under the MIT License. See the repository's `LICENSE` file for the applicable terms.

## Community

Mintforge UI is being built in the open. Developers interested in reusable UI components, design systems, web development, and React Native are welcome to follow the project and participate as it evolves.

If you find the project interesting, consider starring the repository and sharing feedback.

## Built by NEXYOUTH Pvt. Ltd.

**Mintforge UI** is an open-source project developed by **NEXYOUTH Pvt. Ltd.**, with a focus on building reusable UI components and consistent design systems for modern web and mobile applications.

Our goal is to help developers build faster, create consistent interfaces, and customize components to fit their projects.

Learn more about NEXYOUTH: [Official Website](https://nexyouth-web.vercel.app/)

---

**Mintforge UI — Build consistently. Customize freely. Build in the open.**
