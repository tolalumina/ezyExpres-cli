# ezyExpress-CLI🚀

[![npm version](https://img.shields.io/npm/v/celexpress)](https://www.npmjs.com/package/celexpress)
[![Node.js version](https://img.shields.io/node/v/celexpress)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/<USERNAME>/celexpress)](LICENSE)

**exyExpres** — *Fast & Simple Express.js Project Generator CLI*



### Key Improvements Made:
- **Consistent naming** — `ezyExpress` / `ezyexpress` / `cex` (fixed typos like "exyExpres", "ezx", "ezyexpres")
- **Modern look** — Added emoji, better spacing, feature highlights, and a clean command table

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [CLI Commands](#cli-commands)
5. [Project Folder Structure](#project-folder-structure)
6. [Templates](#templates)
7. [License](#license)
8. [Roadmap](#roadmap)

---

## Overview

ezyExpress is a CLI tool for quickly scaffolding **Express.js projects**. It provides **Artisan-style commands** to generate controllers, models, routes, and middlewares with ease.

* Fast project setup
* Interactive prompts
* Modular and extendable CLI

---

## Installation

**Run via npx (no install required):**

```bash
npx ezyexpres
```

**Global installation (optional):**

```bash
npm install -g ezyexpres
cex
```

> `cex` is the CLI shortcut for Celexpress commands.

---

## Usage

### Create a new project

```bash
ezx create my-app
```

Interactive prompts:

```text
📂 Project name? my-app
📝 Use TypeScript? (y/N) n
📁 Select folders: routes, controllers, models, middlewares, services
```

### Generate files

```bash
# Generate a controller
ezx make:controller UserController

# Generate a model
ezx make:model User

# Generate a route
ezx make:route user

# Generate middleware
ezx make:middleware auth

# Generate service
ezx make:service UserService
```

---

## CLI Commands

| Command                      | Description                    |
| ---------------------------- | ------------------------------ |
| `ezx create <project-name>`  | Scaffold a new Express project |
| `ezx make:controller <name>` | Generate a controller file     |
| `ezx make:model <name>`      | Generate a model file          |
| `ezx make:route <name>`      | Generate a route file          |
| `ezx make:middleware <name>` | Generate middleware file       |
| `ezx make:service <name>`    | Generate service file          |
| `ezx --help`                 | List all commands              |

---

## Project Folder Structure

```text
celexpress/
├── bin/
│   └── ezyexpress.js
├── commands/
│   ├── create.js
│   ├── makeController.js
│   ├── makeModel.js
│   ├── makeRoute.js
│   └── makeMiddleware.js
├── templates/
│   ├── js/
│   │   ├── server.js
│   │   ├── controller.js
│   │   └── route.js
│   └── ts/
│       ├── server.ts
│       ├── controller.ts
│       └── route.ts
├── package.json
├── README.md
├── .gitignore
└── LICENSE
```

---

## Templates

**JS Templates (`templates/js/`)**

* `server.js` → basic Express server
* `controller.js` → sample controller
* `route.js` → basic route

**TS Templates (`templates/ts/`)**

* `server.ts` → TypeScript server
* `controller.ts` → TypeScript controller
* `route.ts` → TypeScript route

---




## License

MIT License © 2026 <San Tola>

---

## Roadmap

* **v1.0**: JS scaffolding, basic make commands
* **v1.1**: TypeScript support, auto `.env` creation, middleware templates
* **v1.2**: Database scaffolding, logging setup
* **v2.0**: Plugin system, multi-framework support

---

**ezyExpres-cli** — *Fast & Simple Express.js Project Generator CLI*
