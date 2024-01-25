import { GptMessage, MyMessage, TextMessageBox } from '../../components';
import { TypingLoader } from '../../components/loaders/TypingLoader';

export const OrthographyPage = () => {
	return (
		<div className='chat-container'>
			<div className='chat-messages'>
				<div className='grid grid-cols-12 gap-y-2'>
					<GptMessage text="Welcome, I'll help you with your orthography" />
					<MyMessage text='Hi Assistant' />
					<TypingLoader className='fade-in' />
				</div>
			</div>

			<TextMessageBox
				onSendMessage={(message) => console.log(message)}
				placeholder='type your message here'
				disabledCorrections
			/>
		</div>
	);
};
