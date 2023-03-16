import {
	doc,
	deleteDoc,
	writeBatch,
	query,
	collection,
	getDocs,
	where,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AuthModalStateAtom } from '../atoms/authModalAtom';
import { CommunityStateAtom } from '../atoms/communityAtom';
import { PostStateAtom } from '../atoms/postAtom';
import { auth, storage, firestore } from '../firebase/clientApp';
import { Post, PostState, PostVote } from '../types';

const usePosts = () => {
	const [currentUser] = useAuthState(auth);
	const [postStateValue, setPostStateValue] = useRecoilState(PostStateAtom);
	const setAuthModalState = useSetRecoilState(AuthModalStateAtom);
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(CommunityStateAtom);

	const getCommunityPostVotes = useCallback(
		async (communityId: string) => {
			const postVotesQuery = query(
				collection(firestore, `users/${currentUser?.uid}/postVotes`),
				where('communityId', '==', communityId)
			);
			const postDocs = await getDocs(postVotesQuery);
			const postVotes = postDocs.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setPostStateValue((prevPostState) => ({
				...prevPostState,
				postVote: postVotes as PostVote[],
			}));
		},
		[currentUser?.uid, setPostStateValue]
	);

	const onVote = async (post: Post, vote: number, communityId: string) => {
		if (!currentUser) {
			setAuthModalState({
				open: true,
				view: 'login',
			});
			return;
		}

		const { voteStatus } = post;

		const existingVote = postStateValue.postVote?.find(
			(item) => item.postId === post.id
		);
		const batch = writeBatch(firestore);

		const updatedPost = { ...post };
		let updatedPosts = [...postStateValue.posts];
		let updatedPostVotes = [...postStateValue.postVote];

		if (!existingVote) {
			const postVoteRef = doc(
				collection(firestore, `users/${currentUser.uid}/postVotes`)
			);

			const newPostVote = {
				id: postVoteRef.id,
				postId: post.id as string,
				voteValue: vote,
				communityId,
			};

			batch.set(postVoteRef, newPostVote);

			updatedPost.voteStatus = voteStatus + vote;
			updatedPostVotes = [...updatedPostVotes, newPostVote];
		} else {
			const postVoteRef = doc(
				firestore,
				`users/${currentUser?.uid}/postVotes/${existingVote.id}`
			);

			if (postVoteRef?.id) {
				batch.delete(postVoteRef);
			}

			updatedPost.voteStatus = voteStatus + vote;
			updatedPostVotes = [
				...updatedPostVotes.filter((item) => item.id !== existingVote.id),
			];
		}

		batch.set(doc(firestore, `posts/${post.id}`), updatedPost);

		batch.commit();

		updatedPosts = updatedPosts.map((item) =>
			item.id === post.id
				? { ...item, voteStatus: item.voteStatus + vote }
				: item
		);

		setPostStateValue((prevPostState) => ({
			...prevPostState,
			posts: updatedPosts,
			postVote: updatedPostVotes,
		}));
	};
	const onSelect = () => {};
	const onDelete = async (post: Post): Promise<boolean> => {
		try {
			// if image exist, delete
			if (post.imageURL) {
				const imageRef = ref(storage, `post/${post.id}/image`);
				await deleteObject(imageRef);
			}

			const postDocRef = doc(firestore, `posts/${post.id}`);
			await deleteDoc(postDocRef);

			setPostStateValue((prev) => ({
				...prev,
				posts: prev.posts.filter((item) => item.id !== post.id),
			}));

			return true;
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		if (currentUser && communityStateValue.currentCommunity?.id) {
			getCommunityPostVotes(communityStateValue.currentCommunity.id);
		}
	}, [
		communityStateValue.currentCommunity?.id,
		currentUser,
		getCommunityPostVotes,
	]);

	return {
		postStateValue,
		setPostStateValue,
		onVote,
		onSelect,
		onDelete,
	};
};

export default usePosts;
