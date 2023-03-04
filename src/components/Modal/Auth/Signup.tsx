import { authModalState } from '@/src/atoms/authModalAtom';
import { auth, firestore } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import type { User, UserCredential } from 'firebase/auth';
import { useEffect } from 'react';

type SignupProps = {
	email: string;
	password: string;
	confirmPassword: string;
};

const Signup = () => {
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(32)
			.required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Confirm password must match'),
	});

	const [createUserWithEmailAndPassword, userCred, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const setAuthModal = useSetRecoilState(authModalState);

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<SignupProps>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (values: SignupProps) => {
		createUserWithEmailAndPassword(values.email, values.password);
	};

	const onCreateUser = async (user: User) => {
		await setDoc(doc(firestore, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			providerData: user.providerData,
		});
	};

	useEffect(() => {
		if (userCred) {
			onCreateUser(userCred.user);
		}
	}, [userCred]);

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
					my={2}
				/>
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

				<Text fontSize={12} mt={2} color="red" textAlign="center">
					{errors.email?.message ||
						errors.password?.message ||
						errors.confirmPassword?.message ||
						(error?.code &&
							FIREBASE_ERRORS[error.code as keyof typeof FIREBASE_ERRORS])}
				</Text>
				<Button
					variant="solid"
					width="full"
					height="36px"
					my={3}
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
