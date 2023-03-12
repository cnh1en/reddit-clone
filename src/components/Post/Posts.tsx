import { auth, firestore } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import { Community, Post } from '@/src/types';
import { Box, Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
	communityData: Community;
	userId?: string;
};

const Posts = ({ communityData, userId }: PostsProps) => {
	const [currentUser] = useAuthState(auth);
	const { postStateValue, setPostStateValue, onDelete, onSelect, onVote } =
		usePosts();
	const [isLoadingPosts, setIsLoadingPosts] = useState(false);

	useEffect(() => {
		const getPosts = async () => {
			setIsLoadingPosts(true);
			const postQuery = query(
				collection(firestore, 'posts'),
				where('communityId', '==', communityData.id),
				orderBy('createdAt', 'desc')
			);

			const snapshots = await getDocs(postQuery);

			const posts = snapshots.docs.map((item) => ({
				id: item.id,
				...item.data(),
			})) as Post[];

			setPostStateValue((prev) => ({ ...prev, posts }));
			setIsLoadingPosts(false);
		};
		getPosts();
	}, [communityData.id, setPostStateValue]);

	if (isLoadingPosts) {
		return <PostLoader />;
	}

	return (
		<Stack>
			{postStateValue.posts.map((post, index) => (
				<PostItem
					key={index}
					isCreator={post.creatorId === currentUser?.uid}
					voteValue={post.voteStatus}
					post={post}
					onDelete={onDelete}
				/>
			))}
		</Stack>
	);
};

export default Posts;
