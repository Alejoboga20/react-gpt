import { FormEvent, useRef, useState } from 'react';

interface TextMessageBoxFileProps {
	onSendMessage: (message: string) => void;
	placeholder?: string;
	disabledCorrections?: boolean;
	accept?: string;
}

export const TextMessageBoxFile = ({
	onSendMessage,
	placeholder = '',
	disabledCorrections = false,
	accept,
}: TextMessageBoxFileProps) => {
	const [message, setMessage] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null>();

	const inputFileRef = useRef<HTMLInputElement>(null);

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
			<div className='mr-3'>
				<button
					type='button'
					className='flex items-center justify-center text-gray-400 hover:text-gray-600'
					onClick={() => inputFileRef.current?.click()}
				>
					<i className='fa-solid fa-paperclip text-xl'></i>
				</button>
			</div>
			<input
				type='file'
				ref={inputFileRef}
				className='hidden'
				accept={accept}
				onChange={(e) => setSelectedFile(e.target.files?.item(0))}
			/>

			<div className='flex-grow'>
				<div className='relative w-full'>
					<input
						type='text'
						autoFocus
						name='message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder={placeholder}
						autoComplete={disabledCorrections ? 'off' : 'on'}
						autoCorrect={disabledCorrections ? 'off' : 'on'}
						spellCheck={!disabledCorrections}
						className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
					/>
				</div>
			</div>
			<div className='ml-4'>
				<button className='btn-primary' type='submit' disabled={!selectedFile}>
					{!selectedFile ? (
						<span className='mr-2'>Send</span>
					) : (
						<span className='mr-2'>{selectedFile.name.substring(0, 10) + '...'}</span>
					)}

					<i className='fa-regular fa-paper-plane'></i>
				</button>
			</div>
		</form>
	);
};
