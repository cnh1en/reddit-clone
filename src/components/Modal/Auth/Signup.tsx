import React, { useState } from 'react';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Text,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type SignupProps = {
	email: string;
	password: string;
	confirmPassword: string;
};

const Signup = () => {
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().min(8).max(32).required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Passwords must match'),
	});

	const [signupForm, setSignupForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const setAuthModal = useSetRecoilState(authModalState);

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<SignupProps>({
		resolver: yupResolver(schema),
	});

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignupForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	const onSubmit = () => {
		if (signupForm.password !== signupForm.confirmPassword) {
			// setError
		}
		createUserWithEmailAndPassword(signupForm.email, signupForm.password);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!Object.keys(errors)?.length}>
				<Input
					id="email"
					type="email"
					placeholder="Email"
					fontSize={12}
					required
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
					{...register('email')}
				/>
				<FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
				<Input
					id="password"
					type="password"
					placeholder="Password"
					fontSize={12}
					required
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
					{...register('password')}
					bg="gray.50"
					my={3}
				/>
				<FormErrorMessage>{errors?.password?.message}</FormErrorMessage>

				<Input
					id="confirmPassword"
					type="password"
					placeholder="Confirm password"
					fontSize={12}
					required
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
					{...register('confirmPassword')}
					bg="gray.50"
				/>
				<FormErrorMessage>{errors?.confirmPassword?.message}</FormErrorMessage>

				<Button
					variant="solid"
					width="full"
					height="36px"
					my={4}
					type="submit"
					isLoading={isSubmitting}
				>
					Sign up
				</Button>

				<Flex fontSize="9pt" justify="center">
					<Text mr={1}>Already a redditor ?</Text>
					<Text
						color="blue.500"
						fontWeight={700}
						cursor="pointer"
						textTransform="uppercase"
						onClick={() => {
							setAuthModal((prev) => ({ ...prev, view: 'login' }));
						}}
					>
						log in
					</Text>
				</Flex>
			</FormControl>
		</form>
	);
};

export default Signup;
