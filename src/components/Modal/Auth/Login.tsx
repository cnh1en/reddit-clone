import React, { useState } from 'react';
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import OAuthButtons from './OAuthButtons';

type Props = {};

const Login = (props: Props) => {
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const setAuthModal = useSetRecoilState(authModalState);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	const onSubmit = () => {};

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
			<FormControl onSubmit={onSubmit}>
				<Input
					name="email"
					type="email"
					placeholder="Email"
					onChange={onChange}
					mb={2}
					required
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
				/>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					onChange={onChange}
					required
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
				/>

				<Button variant="solid" width="full" height="36px" my={4}>
					Log in
				</Button>

				<Flex fontSize="9pt" justify="center">
					<Text mr={1}>New here ?</Text>
					<Text
						color="blue.500"
						fontWeight={700}
						cursor="pointer"
						textTransform="uppercase"
						onClick={() =>
							setAuthModal((prev) => ({ ...prev, view: 'signup' }))
						}
					>
						sign up
					</Text>
				</Flex>
			</FormControl>
		</>
	);
};

export default Login;
