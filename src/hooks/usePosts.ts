import { useRecoilState } from 'recoil';
import { PostStateAtom } from '../atoms/postAtom';

const usePosts = () => {
	const [postStateValue, setPostStateValue] = useRecoilState(PostStateAtom);

	const onVote = () => {};
	const onSelect = () => {};
	const onDelete = () => {};

	return {
		postStateValue,
		setPostStateValue,
		onVote,
		onSelect,
		onDelete,
	};
};

export default usePosts;
