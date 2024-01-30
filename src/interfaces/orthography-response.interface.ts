export interface OrthographyResponse {
	completion: Completion;
}

export interface Completion {
	userScore: number;
	errors: string[];
	message: string;
}
