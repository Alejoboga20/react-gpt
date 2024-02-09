import { useState } from 'react';

import { prosConsUseStreamCase } from '../../../core';
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components';

type Message = {
	text: string;
	isGptMessage: boolean;
};

export const ProsConsStreamPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prevMessages) => [...prevMessages, { text, isGptMessage: false }]);

		try {
			await prosConsUseStreamCase(text);
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
					<GptMessage text='Welcome, What would like to compare?' />

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
