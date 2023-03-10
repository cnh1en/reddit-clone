import { Post } from '@/src/types';
import { Flex, Icon, Stack, Text, Image } from '@chakra-ui/react';
import {
	IoArrowDownCircleOutline,
	IoArrowDownCircleSharp,
	IoArrowUpCircle,
	IoArrowUpCircleOutline,
} from 'react-icons/io5';
import dayjs from 'dayjs';

type PostItemProps = {
	post: Post;
	isCreator: boolean;
	voteValue: number;
	onVote?: () => {};
	onDelete?: () => {};
	onSelect?: () => {};
};

const PostItem = ({
	isCreator,
	onDelete,
	onSelect,
	onVote,
	post,
	voteValue,
}: PostItemProps) => {
	return (
		<Flex
			border="1px solid"
			borderColor="gray.300"
			borderRadius={4}
			_hover={{
				borderColor: 'gray.500',
			}}
			cursor="pointer"
			onClick={onSelect}
		>
			<Flex
				direction="column"
				align="center"
				bg="gray.100"
				padding={2}
				width="40px"
				borderRadius={4}
			>
				<Icon
					as={voteValue === 1 ? IoArrowUpCircle : IoArrowUpCircleOutline}
					color={voteValue === 1 ? 'brand.100' : 'gray.400'}
					onClick={onVote}
				/>
				<Text fontSize="9pt">{post.voteStatus}</Text>

				<Icon
					as={
						voteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline
					}
					color={voteValue === 1 ? '#4379ff' : 'gray.400'}
					onClick={onVote}
				/>
			</Flex>

			<Flex direction="column" width="100%" bgColor="white">
				<Stack spacing={1} padding="10px">
					<Flex gap={0.6}>
						<Text fontSize={13}>
							Posted by u/{post.creatorDisplayName} in{' '}
							{dayjs(post.createdAt.seconds * 1000).format('MMM D, YYYY')}
						</Text>
					</Flex>
					{post.imageURL && (
						<Image
							src={post.imageURL}
							width={400}
							height={400}
							style={{
								objectFit: 'cover',
								width: 'auto',
							}}
							alt=""
						/>
					)}
					<Text fontSize={15} fontWeight="bold">
						{post.body}
					</Text>
				</Stack>
			</Flex>
		</Flex>
	);
};

export default PostItem;
