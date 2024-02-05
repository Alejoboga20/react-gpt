import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox } from '../../components';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { orthographyUseCase } from '../../../core/use-cases/orthography.use-case';
import { GptOrthographyMessage } from '../../components/chat-bubbles/GptOrthographyMessage';

type Message = {
	text: string;
	isGptMessage: boolean;
	info?: {
		userScore: number;
		errors?: string[];
		message: string;
	};
};

export const OrthographyPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prevMessages) => [...prevMessages, { text, isGptMessage: false }]);

		const { ok, errors, message, userScore } = await orthographyUseCase(text);

		console.log({ ok, errors, message, userScore });
		if (!ok) {
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: 'An error has ocurred', isGptMessage: true },
			]);
		} else {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					text: message!,
					isGptMessage: true,
					info: {
						errors: errors,
						message: message!,
						userScore: userScore!,
					},
				},
			]);
		}

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
							<GptOrthographyMessage
								key={index}
								message={message.text}
								errors={message.info!.errors || []}
								userScore={message.info!.userScore || 0}
							/>
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
