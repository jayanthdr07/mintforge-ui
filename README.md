# Mintforge UI

**An open-source UI ecosystem for React, Next.js, and React Native.**

Mintforge UI is a developer-focused project for building reusable, customizable UI components and ready-to-use interface blocks for web and mobile applications.

The goal is to help developers build consistent user interfaces faster, with components they can explore, install, customize, and use in their own projects.

## What We're Building

### 1. UI Component Library

A collection of reusable components for React and Next.js, including:

* Buttons, inputs, forms, and dropdowns
* Cards, dialogs, tabs, and tooltips
* Navigation, sidebars, and tables
* Layout components and other common UI elements

### 2. UI Blocks and Templates

Ready-to-use interface sections and larger layouts for common application needs, including:

* Authentication pages
* Admin dashboards
* Settings pages
* Data tables and management interfaces
* SaaS application layouts and other reusable workflows

### 3. React Native Components

A dedicated collection of mobile UI components for React Native and Expo, following a consistent design approach with the web library wherever practical.

### 4. Component Documentation Website

A central website where developers can:

* Browse and search components
* Preview components and explore examples
* Read installation and usage instructions
* Copy code and customize components
* Discover blocks and templates

### 5. Component Installation and Customization

The project aims to make components straightforward to integrate into existing applications. Source-based installation and a CLI or registry may be introduced as the library develops.

## Design Philosophy

Mintforge UI aims to provide:

* **Simple and consistent design** — clean interfaces with thoughtful spacing, typography, and neutral colors.
* **Customization** — components developers can adapt to their requirements.
* **Developer experience** — clear documentation and practical examples.
* **Reusable patterns** — components and blocks designed for real application interfaces.
* **Web and mobile support** — a consistent design language across supported platforms.
* **Open-source collaboration** — a project that developers can inspect, improve, and contribute to.

## Technology Stack

The initial website uses:

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)

React Native, component distribution tooling, and other supporting packages will be introduced as their implementation begins.

## Getting Started

### Prerequisites

* Node.js compatible with the project's Next.js version
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/mintforge-ui.git
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

Open http://localhost:3000 in your browser.

Replace `YOUR-USERNAME` with the GitHub username or organization that owns the repository.

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

## 🤝 Contributing

Contributions, suggestions, bug reports, and discussions are welcome.

Before contributing:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution instructions when available.
2. Check existing issues to avoid duplicating work.
3. Open an issue to discuss significant changes before implementing them.
4. Submit changes through a pull request.

If the contribution guide is not yet available, please open an issue to discuss your proposed contribution first.

## 🐛 Reporting Issues

If you find a bug or have an idea for an improvement, open an issue in the GitHub repository.

Please include enough detail to understand the problem, steps to reproduce it, and expected behavior.

## 🔒 Security

Please do not disclose security vulnerabilities in public issues. Follow the reporting instructions in [SECURITY.md](SECURITY.md) once the security policy has been added.

## 📄 License

Mintforge UI is intended to be released under the [MIT License](LICENSE).

Review the repository's `LICENSE` file for the applicable license terms.

## 💚 Community

Mintforge UI is being built in the open. Developers interested in reusable UI components, design systems, web development, and React Native are welcome to follow the project and participate as it evolves.

If you find the project interesting, consider starring the repository and sharing feedback.

---

**Mintforge UI** — Build consistently. Customize freely. Build in the open.
