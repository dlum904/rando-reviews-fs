This is my React/typescript app I made to brush up on Full Stack Development.

Frontend is React/Vite/Tailwind, backend is express.js with Prisma/Postgres.
Both are deployed from this one repo to a single Vercel project, with the
backend wrapped in a Vercel serverless function.


STRUCTURE:
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


RUNNING LOCALLY:
npm install          <-- installs root + frontend (npm workspaces)
npm run dev:api      <-- express on :5001
npm run dev:web      <-- vite on :3000, proxies /api to :5001
npm run seed         <-- reseed the database
npm run build        <-- prisma generate + frontend build (what Vercel runs)

The frontend calls the API through the relative path /api (VITE_API_URL), so
the same code works behind the vite proxy in dev and on one domain in prod.



NOTE:
CSS styling was done using tailwindcss and was mostly done with AI.
Everything else was coded manually, with some AI assistance for finding syntax issues.

///////////////////////////////////////////

PLANNED BE ROUTES:

reviews
/reviews

comments
/comments

authroutes
/auth/register
/auth/login
/auth/logout


//////////////////////////////////////////

PLANNED SCHEMAS:

Comment = {
	id: string,
	text: string,
	author: User
	date: string,
}

Review = {
	id: string,
	author: User,
	subject: string,
	category: string,
	rating: number,
	text: string,
	date: string,
	comments?: Comment[],
}

User = {
	id: string;
	username: string,
	password: string,
	reviews?: Review[],
	comments?: Comment[],
}