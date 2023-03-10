import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {
	textInputs: {
		title: string;
		body: string;
	};
	loading?: boolean;
	onChange: (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	onCreatePost: () => void;
};

const TextInputs = ({ textInputs, onChange, onCreatePost }: TextInputProps) => {
	return (
		<Flex width="full" bgColor="white">
			<Flex direction="column" padding={8} flexGrow={1} gap={4}>
				<Input
					name="title"
					variant="outline"
					placeholder="Title"
					width="full"
					fontSize="13px"
					_placeholder={{
						fontSize: '13px',
					}}
					onChange={onChange}
					value={textInputs.title}
				/>
				<Textarea
					name="body"
					placeholder="Here is a sample placeholder"
					fontSize="13px"
					_placeholder={{
						fontSize: '13px',
					}}
					onChange={onChange}
					value={textInputs.body}
				/>
				<Button
					flexGrow={0}
					width="70px"
					textTransform="uppercase"
					marginLeft="auto"
					borderRadius={30}
					height={8}
					fontSize={12}
					onClick={onCreatePost}
				>
					post
				</Button>
			</Flex>
		</Flex>
	);
};

export default TextInputs;
