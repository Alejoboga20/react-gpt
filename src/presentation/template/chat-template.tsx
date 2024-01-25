import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../components';

type Message = {
	text: string;
	isGptMessage: boolean;
};

export const ChatTemplate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prevMessages) => [...prevMessages, { text, isGptMessage: false }]);

		/* TODO: call use case */
		setIsLoading(false);

		/* TODO: add gpt message with isGptMessage: true */
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
