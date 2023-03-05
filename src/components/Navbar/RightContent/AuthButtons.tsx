import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { AuthModalStateAtom } from '@/src/atoms/authModalAtom';
import { ViewModalProps } from '@/src/types';

type Props = {};

const AuthButtons = () => {
	const setAuthModal = useSetRecoilState(AuthModalStateAtom);

	const onOpenAuthModal = (view: ViewModalProps) => {
		setAuthModal({
			open: true,
			view,
		});
	};

	return (
		<Flex gap={2} justify="center">
			<Button
				variant="outline"
				height="36px"
				onClick={() => onOpenAuthModal('login')}
			>
				Log in
			</Button>
			<Button
				bg="blue.500"
				color="white"
				height="36px"
				onClick={() => onOpenAuthModal('signup')}
			>
				Sign up
			</Button>
		</Flex>
	);
};

export default AuthButtons;
