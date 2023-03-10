import React, { useEffect, useRef } from 'react';
import { Button, Flex, ButtonProps, Box } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
	images: (string | Blob)[];
	onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onDeleteFile: () => void;
	onBack: () => void;
};

const ImageUpload = ({ images, onSelectFile, onDeleteFile, onBack }: Props) => {
	const fileRef = useRef<HTMLInputElement>(null);

	return (
		<Flex
			align="center"
			justify="center"
			bgColor="white"
			height="300px"
			direction="column"
			py={5}
		>
			<input
				type="file"
				accept="image/*"
				hidden
				ref={fileRef}
				onChange={onSelectFile}
				multiple
			/>
			{images.length > 0 && (
				<Box flexGrow={1}>
					{images.map((image, index: number) => (
						<Image
							alt="index"
							src={image as string}
							width={400}
							height={200}
							style={{
								maxWidth: '400px',
								maxHeight: '200px',
								borderRadius: 10,
								objectFit: 'cover',
							}}
							key={index}
						/>
					))}
				</Box>
			)}

			{images.length > 0 ? (
				<Flex gap={2}>
					<Button
						textTransform="uppercase"
						fontSize="10px"
						height="30px"
						onClick={onBack}
					>
						Back to post
					</Button>

					<Button
						variant="outline"
						textTransform="uppercase"
						fontSize="10px"
						height="30px"
						onClick={onDeleteFile}
					>
						Remove
					</Button>
				</Flex>
			) : (
				<Button
					variant="outline"
					textTransform="uppercase"
					fontSize="10px"
					height="30px"
					onClick={() => fileRef.current?.click()}
				>
					upload
				</Button>
			)}
		</Flex>
	);
};

export default ImageUpload;
