import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

type Props = {};

const OAuthButtons = (props: Props) => {
	return (
		<Flex flexDir="column" align="center" justify="center" gap={3} width="full">
			<Button variant="oauth" py={4.5} width="full">
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
