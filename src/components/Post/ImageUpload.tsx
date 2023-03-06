import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useRef } from 'react';

type Props = {
	images: string[];
	onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload = ({ onSelectFile, images }: Props) => {
	const fileRef = useRef<HTMLInputElement>(null);

	return (
		<Flex align="center" justify="center" bgColor="white" height="248px">
			<input
				type="file"
				accept="image/*"
				hidden
				ref={fileRef}
				onChange={onSelectFile}
				multiple
			/>
			{images.map((image: string, index: number) => (
				<Image alt="index" src={image} width={200} height={200} key={index} />
			))}

			<Button
				variant="outline"
				textTransform="uppercase"
				fontSize="10px"
				height="30px"
				onClick={() => fileRef.current?.click()}
			>
				upload
			</Button>
		</Flex>
	);
};

export default ImageUpload;
