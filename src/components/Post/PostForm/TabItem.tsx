import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { TabProps, SelectedTabType } from './NewPostForm';

type TabItemProps = {
	item: TabProps;
	selected: boolean;
	setSelectedTab: (value: SelectedTabType) => void;
};

const TabItem = ({ item, selected, setSelectedTab }: TabItemProps) => {
	return (
		<Flex
			justify="center"
			align="center"
			cursor="pointer"
			flexGrow={1}
			padding="12px 16px"
			borderBottomWidth={2}
			borderColor={selected ? 'blue.500' : 'gray.200'}
			bgColor={selected ? 'gray.100' : 'white'}
			color="gray.600"
			onClick={() => setSelectedTab(item.title)}
			gap={1.2}
			_hover={{
				bgColor: 'gray.50',
			}}
		>
			<Flex align="center">
				<Icon as={item.icon} fontSize={24} color="gray.600" />
			</Flex>
			<Text fontSize="12px" fontWeight="bold">
				{item.title}
			</Text>
		</Flex>
	);
};

export default TabItem;
