import { atom } from 'recoil';
import { CommunityState } from '../types';

export const CommunityStateAtom = atom<CommunityState>({
	key: 'communityState',
	default: {
		mySnippets: [],
		currentCommunity: null,
	},
});
