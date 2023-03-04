import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import CreateCommunity from '../../Modal/Communities/CreateCommunity';

type Props = {};

const Directory = (props: Props) => {
	const [isOpenCommunity, setIsOpenCommunity] = useState(false);

	return (
		<>
			{isOpenCommunity && (
				<CreateCommunity
					isOpen={isOpenCommunity}
					onClose={() => setIsOpenCommunity(false)}
				/>
			)}
			<Box ml={10}>
				<Menu>
					<MenuButton as={Box} cursor="pointer">
						<Flex align="center" gap={3}>
							<Icon as={AiFillHome} fontSize={22} />
							<Text fontSize={14}>Home</Text>
							<ChevronDownIcon fontSize={20} />
						</Flex>
					</MenuButton>

					<MenuList>
						<MenuItem
							_hover={{
								bg: 'blue.500',
								color: 'white',
							}}
							onClick={() => setIsOpenCommunity(true)}
						>
							<Flex align="center" gap={3}>
								<Icon as={BsPlus} fontSize={20} />
								<Text fontSize={14}>Create community</Text>
							</Flex>
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
		</>
	);
};

export default Directory;
