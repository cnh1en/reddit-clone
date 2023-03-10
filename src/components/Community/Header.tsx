import useCommunity from '@/src/hooks/useCommunity';
import { Community } from '@/src/types';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';

type HeaderProps = {
	communityData: Community;
};

const Header = ({ communityData }: HeaderProps) => {
	const { communityStateValue, onJoinOrLeave, isLoading } = useCommunity();

	const isJoined = !!communityStateValue.mySnippets?.find(
		(item) => item.communityId === communityData.id
	);

	return (
		<Flex direction="column" width="full" height="146px">
			<Box height="50%" bgColor="blue.500" />
			<Flex justify="center" bgColor="white" flexGrow={1}>
				<Flex width="95%" maxWidth="880px">
					<Icon
						as={FaReddit}
						fontSize={64}
						position="relative"
						top="-4"
						border="4px solid white"
						borderRadius="50%"
						color="blue.500"
					/>

					<Flex padding="10px 12px">
						<Flex direction="column" mr={6}>
							<Text fontSize="16pt" fontWeight="700">
								{communityData.id}
							</Text>

							<Text fontWeight={600} fontSize="10pt" color="gray.400">
								r/{communityData.id}
							</Text>
						</Flex>
						<Button
							height="60%"
							onClick={() => onJoinOrLeave(isJoined, communityData)}
							variant={isJoined ? 'outline' : 'solid'}
							isLoading={isLoading}
						>
							{isJoined ? 'Joined' : 'Join'}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Header;
