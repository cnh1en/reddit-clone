import React, { useEffect } from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/src/firebase/clientApp';
import type { User, UserCredential } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type Props = {};

const OAuthButtons = (props: Props) => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);

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
		<Flex flexDir="column" align="center" justify="center" gap={3} width="full">
			<Button
				variant="oauth"
				py={4.5}
				width="full"
				isLoading={loading}
				onClick={() => signInWithGoogle()}
			>
				<Image src="/images/googlelogo.png" alt="" width={5} />
				<Text ml={1}> Continue with Google</Text>
			</Button>
			<Button variant="oauth" py={4.5} width="full">
				Some other provider
			</Button>
		</Flex>
	);
};

export default OAuthButtons;
