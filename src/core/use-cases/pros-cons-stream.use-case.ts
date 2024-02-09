export const prosConsUseStreamCase = async (prompt: string) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt }),
			/* TODO: abortSignal */
		});

		if (!response.ok) throw new Error('Error: Something went wrong.');

		const reader = response.body?.getReader();

		if (!reader) {
			console.log('Reader not found');
			return null;
		}

		let text = '';
		const decoder = new TextDecoder();

		while (true) {
			const { value, done } = await reader.read();

			if (done) break;

			const decodedChunk = decoder.decode(value, { stream: true });
			text += decodedChunk;
			console.log({ text });
		}
	} catch (error) {
		return null;
	}
};
