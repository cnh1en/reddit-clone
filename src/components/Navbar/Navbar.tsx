import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

type NavbarProps = {};

const Navbar = () => {
	return (
		<Flex
			bg="white"
			height="50px"
			padding="6px 12px"
			alignItems="center"
			gap={1}
		>
			<Image src="/images/redditlogo.png" alt="reddit" width={80} height={80} />
			<SearchInput />
			<RightContent />
		</Flex>
	);
};

export default Navbar;
