# Description

This is the app for potential buyers, they search for the suppliers that meet their criteria.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

testing is at: [https://app-stage.supplybridge.com/login](https://app-stage.supplybridge.com/login)

production is at [https://app.supplybridge.com/login](https://app.supplybridge.com/login)

# Tech stack

We use the following tools to build this app:
React, Zustand, Next.js, MUI.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. By default, the backend API URL(https://api-stage.supplybridge.com) is defined in .env file. If you want to use this app to test backend, go edit the .env file, change the API URL to http://localhost:5858

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Coding guidelines

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## development guideline

- use yarn to manage dependencies
- create your own local branch from development, never work directly on development, stage or master
- don't implement basic elements(button, dropdown) from scratch, use [MUI](https://mui.com/material-ui/getting-started/overview/) as much as possible
- install Visual Studio Code Extension "Prettier Formatter for Visual Studio Code" to auto format your code, and make code style consistent among all developers

## commit message

start your commit message with these prefix to represent your intension:
feat, fix, docs, style, refactor, test, chore

## deployment guideline

1. start your development by creating a new branch off development branch, name it like 'fix/login-error', 'feat/add-filter-options'.
2. after committing and pushing your code, send a Pull Request
3. wait for your peer to do code review
4. if your PR is passed, merge your branch into development
5. if your commit is urgent, ask technical lead to deploy the changes on staging environment for testing
