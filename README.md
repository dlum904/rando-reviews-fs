This is my React/typescript app I made to brush up on Full Stack Development.

Currently, the Frontend is mostly built.
Planning to add a Backend using express.js
Planning on wrapping backend code in Vercel serverless function, or use Render


THE PLAN:
rando-reviews-fs       
├── api/             <-- Rename 'backend' to 'api' and move to the root
│   ├── controllers/
│   └── index.js     <-- Change app.listen() to module.exports = app;
├── frontend/        <-- Vercel can build this folder as your frontend project
│   ├── src/
│   └── ...
├── package.json     <-- Move your backend dependencies here to the root
└── vercel.json      <-- Add a root vercel.json file for routing rules



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