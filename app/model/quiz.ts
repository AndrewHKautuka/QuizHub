export interface choice {
	text: string;
	isCorrect: boolean;
};

export interface question {
	text: string;
	type: "multiple-choice" | "true/false";
	correctChoice: number;
	choices: choice[];
};

export interface quiz {
	title: string;
	description?: string;
	questions: question[];
};