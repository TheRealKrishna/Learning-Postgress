# Backend (TypeScript + Express)

Commands:

Install dependencies

```
cd backend
npm install
```

Run in development (auto-restart):

```
npm run dev
```

Open http://localhost:3000/ping to view the frontend ping page.

Database
--------

This project uses `node-postgres` (`pg`). Copy `.env.example` to `.env` and set your Postgres connection values (or provide a `DATABASE_URL`). Then install deps and run the server.

Example:

```
cd backend
npm install
cp .env.example .env
npm run dev
```

The server will try a simple `SELECT NOW()` on startup and log whether Postgres connected successfully.
