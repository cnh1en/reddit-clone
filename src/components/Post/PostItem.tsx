import { Post } from '@/src/types';
import {
	Box,
	Flex,
	Icon,
	Image,
	Skeleton,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import {
	IoArrowDownCircleOutline,
	IoArrowDownCircleSharp,
	IoArrowRedoOutline,
	IoArrowUpCircle,
	IoArrowUpCircleOutline,
	IoBookmarkOutline,
	IoTrashBinOutline,
} from 'react-icons/io5';

type PostItemProps = {
	post: Post;
	isCreator: boolean;
	voteValue: number;
	onVote?: () => {};
	onDelete: (post: Post) => Promise<boolean>;
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
	const [isLoadingImage, setIsLoadingImage] = useState(true);
	const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false);

	const handleDelete = async () => {
		setIsLoadingDeletePost(true);
		const success = await onDelete(post);
		if (success) {
			console.log('handleDelete', 'Post was deleted successfully');
		}
		setIsLoadingDeletePost(false);
	};

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
				<Stack spacing={2} padding="10px">
					<Flex gap={0.6}>
						<Text fontSize={13}>
							Posted by u/{post.creatorDisplayName} in{' '}
							{dayjs(post.createdAt.seconds * 1000).format('MMM D, YYYY')}
						</Text>
					</Flex>

					<Flex direction="column">
						<Text fontSize={16} fontWeight="bold">
							{post.title}
						</Text>
						<Text fontSize={14}>{post.body}</Text>
					</Flex>

					<Flex align="center">
						{post.imageURL && (
							<>
								{isLoadingImage && <Skeleton height="220px" />}
								<Image
									src={post.imageURL}
									maxHeight="380px"
									objectFit="contain"
									alt=""
									onLoad={() => setIsLoadingImage(false)}
								/>
							</>
						)}
					</Flex>
				</Stack>
				<Flex ml={1} mb={0.5} mt={2} color="gray.500" fontWeight={600}>
					<Flex
						align="center"
						p="8px 10px"
						borderRadius={4}
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
					>
						<Icon as={BsChat} mr={2} />
						<Text fontSize="9pt">{post.numberOfComments}</Text>
					</Flex>
					<Flex
						align="center"
						p="8px 10px"
						borderRadius={4}
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
					>
						<Icon as={IoArrowRedoOutline} mr={2} />
						<Text fontSize="9pt">Share</Text>
					</Flex>
					<Flex
						align="center"
						p="8px 10px"
						borderRadius={4}
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
					>
						<Icon as={IoBookmarkOutline} mr={2} />
						<Text fontSize="9pt">Save</Text>
					</Flex>

					<Flex
						align="center"
						p="8px 10px"
						borderRadius={4}
						_hover={{ bg: 'gray.200' }}
						cursor="pointer"
						onClick={handleDelete}
					>
						{isLoadingDeletePost ? (
							<Spinner size="sm" />
						) : (
							<>
								<Icon as={IoTrashBinOutline} mr={2} />
								<Text fontSize="9pt">Delete</Text>
							</>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PostItem;
