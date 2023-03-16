import { atom } from 'recoil';
import { PostState } from '../types';

export const PostStateAtom = atom<PostState>({
	key: 'communityState',
	default: {
		selectedPost: null,
		posts: [],
		postVote: [],
	},
});
