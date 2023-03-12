import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { PostStateAtom } from '../atoms/postAtom';
import { storage, firestore } from '../firebase/clientApp';
import { Post } from '../types';

const usePosts = () => {
	const [postStateValue, setPostStateValue] = useRecoilState(PostStateAtom);

	const onVote = () => {};
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

	return {
		postStateValue,
		setPostStateValue,
		onVote,
		onSelect,
		onDelete,
	};
};

export default usePosts;
