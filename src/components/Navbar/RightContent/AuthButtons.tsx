import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

type Props = {};

const AuthButtons = (props: Props) => {
	return (
		<Flex
			gap={2}
			display={{
				base: 'none',
				md: 'flex',
			}}
		>
			<Button variant="outline">Log in</Button>
			<Button bg="blue.500" color="white">
				Sign up
			</Button>
		</Flex>
	);
};

export default AuthButtons;
