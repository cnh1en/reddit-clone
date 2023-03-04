import { authModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import {
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';

const AuthModal = () => {
	const [authModal, setAuthModal] = useRecoilState(authModalState);
	const handleClose = useCallback(() => {
		setAuthModal((prev) => ({ ...prev, open: false }));
	}, [setAuthModal]);

	const [currentUser, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (currentUser) handleClose();
	}, [currentUser, handleClose]);

	return (
		<Modal isOpen={authModal.open} onClose={handleClose} trapFocus={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader my={3} textAlign="center">
					{authModal.view === 'login' && 'Login'}
					{authModal.view === 'signup' && 'Sign up'}
					{authModal.view === 'resetPassword' && 'Reset Password'}
				</ModalHeader>

				<ModalBody
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDir="column"
				>
					<Flex direction="column" align="center" justify="center" width="70%">
						<AuthInputs />
					</Flex>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AuthModal;
