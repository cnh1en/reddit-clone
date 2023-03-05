import React, { useState } from 'react';
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { AuthModalStateAtom } from '@/src/atoms/authModalAtom';
import OAuthButtons from './OAuthButtons';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';

const Login = () => {
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const setAuthModal = useSetRecoilState(AuthModalStateAtom);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const handleLogin = () => {
		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};

	return (
		<>
			<OAuthButtons />
			<Text
				textTransform="uppercase"
				fontWeight="bold"
				fontSize="medium"
				my={2}
			>
				or
			</Text>
			<FormControl>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="Email"
					onChange={onChange}
					fontSize={12}
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
				/>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="Password"
					onChange={onChange}
					fontSize={12}
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
				/>
				<Text fontSize={12} mt={2} color="red" textAlign="center">
					{error?.code &&
						FIREBASE_ERRORS[error.code as keyof typeof FIREBASE_ERRORS]}
				</Text>
				<Button
					variant="solid"
					width="full"
					height="36px"
					my={3}
					onClick={handleLogin}
					isLoading={loading}
					isDisabled={!loginForm.email || !loginForm.password}
				>
					Log in
				</Button>
			</FormControl>
			<Flex fontSize="9pt" justify="center" mb={1}>
				<Text mr={1}>Forgot your password ?</Text>
				<Text
					color="blue.500"
					fontWeight={700}
					cursor="pointer"
					textTransform="uppercase"
					onClick={() =>
						setAuthModal((prev) => ({ ...prev, view: 'resetPassword' }))
					}
				>
					Reset
				</Text>
			</Flex>

			<Flex fontSize="9pt" justify="center">
				<Text mr={1}>New here ?</Text>
				<Text
					color="blue.500"
					fontWeight={700}
					cursor="pointer"
					textTransform="uppercase"
					onClick={() => setAuthModal((prev) => ({ ...prev, view: 'signup' }))}
				>
					sign up
				</Text>
			</Flex>
		</>
	);
};

export default Login;
