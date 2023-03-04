import { auth } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

type Props = {};

const ResetPassword = (props: Props) => {
	const [email, setEmail] = useState('');
	const [isSend, setIsSend] = useState(false);

	const [sendPasswordResetEmail, sending, error] =
		useSendPasswordResetEmail(auth);

	const handleResetPassword = () => {
		sendPasswordResetEmail(email);
		setIsSend(true);
	};

	return (
		<Flex direction="column" gap={3} justify="center" align="center">
			<Image src="/images/redditlogo.png" alt="reddit" width={80} height={80} />
			<Text fontSize={18} fontWeight="bold">
				Reset your password
			</Text>

			{isSend ? (
				<Text>Please check your email !!</Text>
			) : (
				<Box w="full">
					<Text fontSize={14} textAlign="center" mb={2}>
						Enter the email associated with your account and we will send you a
						reset link
					</Text>
					<Input
						id="email"
						name="email"
						type="email"
						required
						placeholder="Email"
						fontSize={12}
						isRequired
						w="full"
						mb={3}
						_placeholder={{ color: 'gray.500', fontSize: '12px' }}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>

					<Text fontSize={12} color="red" textAlign="center">
						{error?.message &&
							FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
					</Text>

					<Button
						width="full"
						onClick={handleResetPassword}
						isLoading={sending}
						isDisabled={!email}
					>
						Reset password
					</Button>
				</Box>
			)}
			<Flex justify="center" align="center" gap={4}>
				<Text
					color="blue.500"
					textTransform="uppercase"
					fontSize={12}
					fontWeight="bold"
				>
					Login
				</Text>
				<Text
					color="blue.500"
					textTransform="uppercase"
					fontSize={12}
					fontWeight="bold"
				>
					Sign up
				</Text>
			</Flex>
		</Flex>
	);
};

export default ResetPassword;
