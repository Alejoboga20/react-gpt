import { OrthographyResponse } from '../../interfaces';

export const orthographyUseCase = async (prompt: string) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
		});

		if (!response.ok) throw new Error('Error: Something went wrong.');

		const data = (await response.json()) as OrthographyResponse;

		return {
			ok: true,
			userScore: data.completion.userScore,
			errors: data.completion.errors,
			message: data.completion.message,
		};
	} catch (error) {
		return {
			ok: false,
			userScore: 0,
			errors: [],
			message: 'Error: Something went wrong.',
		};
	}
};
