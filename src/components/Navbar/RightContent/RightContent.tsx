import React from 'react';
import {
	Button,
	Flex,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import { HamburgerIcon } from '@chakra-ui/icons';

type Props = {};

const RightContent = (props: Props) => {
	return (
		<>
			<Flex justifyContent="center" alignItems="center" gap={2}>
				<AuthButtons />

				<Button
					color="blue.500"
					variant="outline"
					display={{
						md: 'none',
					}}
				>
					<HamburgerIcon color="blue.500" />
				</Button>
			</Flex>
		</>
	);
};

export default RightContent;
