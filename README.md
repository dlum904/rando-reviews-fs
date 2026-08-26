This is my React/typescript app I made to brush up on Full Stack Development.

Currently, the Frontend is mostly built.
Planning to add a Backend using express.js
Planning on wrapping backend code in Vercel serverless function.


THE PLAN:
my-review-app/       (Root Git Repository)
├── frontend/        (React/Vite project)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/         (Express project)
│   ├── controllers/
│   ├── package.json
│   └── index.js
└── README.md        (Explains the whole project)


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
	upVotes?: number,
	downVotes?: number,
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