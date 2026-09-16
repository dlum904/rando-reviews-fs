# Rando Reviews

### Description
This is my React/typescript app I made to brush up on Full Stack Development.

Frontend is React/Vite/Tailwind, backend is express.js with Prisma/Postgres.
Both are deployed from this one repo to a single Vercel project, with the
backend wrapped in a Vercel serverless function.

### NOTE:
CSS styling was done using tailwindcss and was mostly done with AI.
Everything else was coded manually, with some AI assistance for finding syntax issues.

---

## STRUCTURE:
rando-reviews-fs
├── api/
│   └── index.js     <-- exports the express app; ONLY file here, since Vercel
│                        turns every file under api/ into its own function
├── server/          <-- the actual backend
│   ├── app.js       <-- builds the express app, mounts routes under /api
│   ├── dev.js       <-- local-only entry: app.listen()
│   ├── config/  controllers/  middleware/  routes/  utils/  validators/
├── prisma/          <-- schema, migrations, seed
├── frontend/        <-- Vite app, built to frontend/dist
├── package.json     <-- backend deps + npm workspace for frontend
├── prisma.config.ts
└── vercel.json      <-- build config + /api/* and SPA routing rules

## RUNNING LOCALLY:
npm install          <-- installs root + frontend (npm workspaces)
npm run dev:api      <-- express on :5001
npm run dev:web      <-- vite on :3000, proxies /api to :5001
npm run seed         <-- reseed the database
npm run build        <-- prisma generate + frontend build (what Vercel runs)

---

## Routes

### Auth — `/api/auth`
| Method | Path        | Auth |
| ------ | ----------- | ---- |
| POST   | `/register` | No   |
| POST   | `/login`    | No   |
| POST   | `/logout`   | No   |
| GET    | `/getUser`  | Yes  |

### Reviews — `/api/reviews`
| Method | Path                 | Auth |
| ------ | -------------------- | ---- |
| GET    | `/`                  | No   |
| GET    | `/:reviewId`         | No   |
| POST   | `/add`               | Yes  |
| DELETE | `/delete/:reviewId`  | Yes  |

| Method | Path                      | Auth |
| ------ | ------------------------- | ---- |
| GET    | `/:reviewId`              | No   |
| GET    | `/:reviewId/:commentId`   | No   |
| POST   | `/add/:reviewId`          | Yes  |

### Comments — `/api/comments`
| Method | Path                      | Auth |
| ------ | ------------------------- | ---- |
| GET    | `/:reviewId`              | No   |
| GET    | `/:reviewId/:commentId`   | No   |
| POST   | `/add/:reviewId`          | Yes  |
