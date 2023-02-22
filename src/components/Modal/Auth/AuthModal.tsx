import { authModalState } from '@/src/atoms/authModalAtom';
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
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';

type Props = {};

const AuthModal = () => {
	const [authModal, setAuthModal] = useRecoilState(authModalState);
	const handleClose = () => {
		setAuthModal((prev) => ({ ...prev, open: false }));
	};

	return (
		<>
			<Modal isOpen={authModal.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader my={3} textAlign="center">
						{authModal.view === 'login' ? 'Login' : 'Sign up'}
					</ModalHeader>

					<ModalBody
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDir="column"
					>
						<Flex
							direction="column"
							align="center"
							justify="center"
							width="70%"
						>
							{/* SIGN UP / LOG IN */}
							<AuthInputs />
						</Flex>
					</ModalBody>

					<ModalBody pb={6}></ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
