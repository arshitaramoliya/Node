# Node.js Fundamentals

Hands-on exploration of Node.js core concepts — module system, CommonJS exports, npm package management, and asynchronous patterns.

## Topics Covered

### Module System
- `math.js` — custom module exporting utility functions (`sum`, `mul`, constants)
- `Fruits/` — demonstrates named and default exports with `require()`
- `script.js` — imports and consumes custom modules

### NPM & Third-Party Packages
- `MyProject/` — integrates `figlet` (ASCII art) and `joke` npm packages
- Hands-on with `package.json`, dependency management, and `node_modules`

### Core Concepts
- CommonJS module pattern (`module.exports` / `require`)
- Separation of concerns across modules
- Running scripts with `node`

## What This Demonstrates

- Understanding of **Node.js module system** — the foundation of every Node.js backend
- Practical use of **npm** for installing and using third-party packages
- Writing **reusable, exportable modules** — a pattern used in every Express.js project

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-dc2626?style=flat-square&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-dc2626?style=flat-square&logo=javascript&logoColor=white)
![npm](https://img.shields.io/badge/npm-dc2626?style=flat-square&logo=npm&logoColor=white)

## Run Locally

```bash
npm install
node script.js
```
