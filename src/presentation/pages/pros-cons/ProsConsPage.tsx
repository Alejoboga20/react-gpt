import { useState } from 'react';

import { prosConsUseCase } from '../../../core';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components';

type Message = {
	text: string;
	isGptMessage: boolean;
};

export const ProsConsPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prevMessages) => [...prevMessages, { text, isGptMessage: false }]);

		try {
			const { ok, content } = await prosConsUseCase(text);
			if (!ok) return;
			setMessages((prevMessages) => [...prevMessages, { text: content, isGptMessage: true }]);
		} catch (error) {
			console.log({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='chat-container'>
			<div className='chat-messages'>
				<div className='grid grid-cols-12 gap-y-2'>
					<GptMessage text="Welcome, I'll help you with your orthography" />

					{messages.map((message, index) =>
						message.isGptMessage ? (
							<GptMessage key={index} text={message.text} />
						) : (
							<MyMessage key={index} text={message.text} />
						)
					)}

					{isLoading && (
						<div className='col-start-1 col-end-12 fade-in'>
							<TypingLoader />
						</div>
					)}
				</div>
			</div>

			<TextMessageBox
				onSendMessage={handlePost}
				placeholder='type your message here'
				disabledCorrections
			/>
		</div>
	);
};
