import { ProsConsResponse } from '../../interfaces';

export const prosConsUseCase = async (prompt: string) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
		});

		if (!response.ok) throw new Error('Error: Something went wrong.');

		const data = (await response.json()) as ProsConsResponse;

		return {
			ok: true,
			content: data.completion.content,
		};
	} catch (error) {
		return {
			ok: false,
			content: 'Error: Something went wrong.',
		};
	}
};
