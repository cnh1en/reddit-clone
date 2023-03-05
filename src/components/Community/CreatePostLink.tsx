import { AuthModalStateAtom } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import {
	Flex,
	Icon,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaCamera, FaReddit } from 'react-icons/fa';
import { IoMdAttach } from 'react-icons/io';
import { useSetRecoilState } from 'recoil';

type Props = {};

const CreatePostLink = ({}: Props) => {
	const router = useRouter();
	const [currentUser] = useAuthState(auth);

	const openLoginModal = useSetRecoilState(AuthModalStateAtom);

	const onClick = async () => {
		if (!currentUser) {
			openLoginModal({
				open: true,
				view: 'login',
			});
		}
		const { communityId } = router.query;

		router.push(`/r/${communityId}/submit`);
	};

	return (
		<Flex
			justify="space-between"
			align="center"
			height="56px"
			border="1px solid"
			borderColor="gray.300"
			bgColor="white"
			gap={4}
			padding="6px"
		>
			<Icon as={FaReddit} fontSize={26} color="gray.300" />
			<Input
				placeholder="Create Post"
				fontSize="10pt"
				_placeholder={{ color: 'gray.500' }}
				_hover={{
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg="gray.50"
				borderColor="gray.200"
				height="36px"
				borderRadius={4}
				mr={4}
				onClick={onClick}
			/>

			<Flex align="center" gap={2} color="gray.300">
				<Icon
					as={FaCamera}
					fontSize={22}
					cursor="pointer"
					_hover={{
						color: 'gray.600',
					}}
				/>
				<Icon
					as={IoMdAttach}
					fontSize={22}
					cursor="pointer"
					_hover={{
						color: 'gray.600',
					}}
				/>
			</Flex>
		</Flex>
	);
};

export default CreatePostLink;
