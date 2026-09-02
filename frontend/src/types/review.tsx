type Comment = {
	id: string;
	text: string;
	author: string;
	date: string;
	upVotes?: number;
	downVotes?: number;
}

type Review = {
	id: string;
	author: string;
	title: string;
	category: string;
	rating: number;
	text: string;
	date: string;
	userImage?: string;
	comments?: Comment[];
}

type User = {
	id: string;
	username: string;
} | null;

export { type Review, type Comment, type User };