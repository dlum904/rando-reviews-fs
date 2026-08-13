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
	subject: string;
	category: string;
	rating: number;
	text: string;
	date: string;
	userImage?: string;
	comments?: Comment[];
}

export { type Review, type Comment };