// Common types

type Comment = {
	id: string;
	authorId: string;
	text: string;
	author: string;
	date: string;
}

type Review = {
	id: string;
	authorId: string;
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