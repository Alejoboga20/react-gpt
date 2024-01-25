import { FormEvent, useState } from 'react';

interface TextMessageBoxProps {
	onSendMessage: (message: string) => void;
	placeholder?: string;
	disabledCorrections?: boolean;
}

export const TextMessageBox = ({
	onSendMessage,
	placeholder = '',
	disabledCorrections = false,
}: TextMessageBoxProps) => {
	const [message, setMessage] = useState('');

	const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (message.trim().length === 0) return;

		onSendMessage(message);
		setMessage('');
	};

	return (
		<form
			onSubmit={handleSendMessage}
			className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
		>
			<div className='flex-grow'>
				<div className='relative w-full'>
					<input
						type='text'
						autoFocus
						name='message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder={placeholder}
						autoComplete={disabledCorrections ? 'on' : 'off'}
						autoCorrect={disabledCorrections ? 'on' : 'off'}
						spellCheck={!disabledCorrections}
						className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
					/>
				</div>
			</div>
			<div className='ml-4'>
				<button className='btn-primary' type='submit'>
					<span className='mr-2'>Send</span>
					<i className='fa-regular fa-paper-plane'></i>
				</button>
			</div>
		</form>
	);
};
