import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

type NavbarProps = {};

const Navbar = () => {
	return (
		<Flex bg="white" height="44px" padding="6px 12px">
			<Flex align="center">
				<Image
					src="/images/redditlogo.png"
					alt="reddit"
					width={80}
					height={80}
				/>
			</Flex>
		</Flex>
	);
};

export default Navbar;
