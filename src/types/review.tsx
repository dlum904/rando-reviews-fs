
type Review = {
	id: string;
	author: string;
	subject: string;
	category: string;
	rating: number;
	text: string;
	date: string;
	userImage?: string;
	thread?: string[]
}

export { type Review };