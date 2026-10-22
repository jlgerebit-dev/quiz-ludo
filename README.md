# Quiz Ludo Backend

Express 5 and Sequelize 6 backend scaffold for Quiz Ludo, a multiplayer quiz and
dice board game for classrooms and libraries.

CS313 Software Engineering 1 - Group 10 - Section 3-1

## Requirements

- Node.js 22+
- PostgreSQL 16+

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Set `DB_PASSWORD` in `.env`, then create and populate the database:

```powershell
npm run db:create
npm run db:migrate
npm run db:seed
npm run db:check
npm run dev
```

The API is mounted under `/api/v1`:

- `GET http://localhost:3001/api/v1/health`
- `GET http://localhost:3001/api/v1/game-info`

`db:check` reports row counts for every table and exits unsuccessfully if any table is
empty. Set `EXPECTED` to a non-empty value in `.env` to allow empty tables during
development.

## Tables

The migrations live in `db/migrations` and the seed data in `db/seeders`. One migration
per table, in the order of the ERD in `docs/`.

## The game

Quiz Ludo is a classroom and library game for 1 to 4 players. A teacher or librarian
is the host: the host writes the questions, opens a room and projects the host screen
for the class. Players join on their own phones or laptops with a six digit code and a
nickname. A question appears, everybody answers once, the first correct answer wins the
round and rolls the dice, and the first player to bring both tokens home wins the match.
