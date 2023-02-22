/* eslint-disable react/no-children-prop */
import React from 'react';
import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

type Props = {};

const SearchInput = (props: Props) => {
	return (
		<Flex flexGrow={1} justifyContent="center">
			<InputGroup w="60%">
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" />}
				/>
				<Input
					className="Input"
					type="tel"
					placeholder="Search Reddit"
					fontSize="10pt"
					_focus={{
						outline: 'none',
					}}
				/>
			</InputGroup>
		</Flex>
	);
};

export default SearchInput;
