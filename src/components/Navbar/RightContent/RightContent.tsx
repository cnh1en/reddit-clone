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
	useDisclosure,
} from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';

type Props = {};

const RightContent = (props: Props) => {
	return (
		<>
			<Flex justifyContent="center" alignItems="center">
				<AuthButtons />
			</Flex>

			<AuthModal />
		</>
	);
};

export default RightContent;
