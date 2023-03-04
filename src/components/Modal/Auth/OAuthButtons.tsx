import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';

type Props = {};

const OAuthButtons = (props: Props) => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
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
