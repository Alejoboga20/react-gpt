import { useState } from 'react';
import { GptMessage, MyMessage, TextMessageBox, TextMessageBoxFile } from '../../components';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { orthographyUseCase } from '../../../core/use-cases/orthography.use-case';

type Message = {
	text: string;
	isGptMessage: boolean;
};

export const OrthographyPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string) => {
		setIsLoading(true);
		setMessages((prevMessages) => [...prevMessages, { text, isGptMessage: false }]);

		const data = await orthographyUseCase(text);
		console.log({ data });
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
			{/* 
			<TextMessageBoxFile
				onSendMessage={handlePost}
				placeholder='type your message here'
				disabledCorrections
			/> */}
			{/* <TextMessageBoxSelect
				onSendMessage={handlePost}
				placeholder='type your message here'
				options={[
					{
						id: '1',
						text: 'Option 1',
					},
					{
						id: '2',
						text: 'Option 2',
					},
				]}
				disabledCorrections
			/> */}
		</div>
	);
};
