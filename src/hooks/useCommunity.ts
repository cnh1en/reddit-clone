import { auth } from '@/src/firebase/clientApp';
import {
	collection,
	doc,
	getDocs,
	increment,
	runTransaction,
	writeBatch,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CommunityStateAtom } from '../atoms/communityAtom';
import { AuthModalStateAtom } from '../atoms/authModalAtom';
import { firestore } from '../firebase/clientApp';
import { Community, CommunitySnippet } from '../types';

const useCommunity = () => {
	const [currentUser] = useAuthState(auth);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(CommunityStateAtom);

	const openLoginModal = useSetRecoilState(AuthModalStateAtom);

	const onJoinOrLeave = (isJoined: boolean, communityData: Community) => {
		if (!currentUser) {
			openLoginModal({
				open: true,
				view: 'login',
			});
			return;
		}

		if (isJoined) {
			leave(communityData.id);
			return;
		}

		join(communityData);
	};

	const join = async (communityData: Community) => {
		setIsLoading(true);
		try {
			if (!currentUser?.uid) return;

			const batch = writeBatch(firestore);

			batch.set(
				doc(
					firestore,
					`users/${currentUser.uid}/communitySnippets/${communityData.id}`
				),
				{
					communityId: communityData.id,
					isModerator: false,
				}
			);

			batch.update(doc(firestore, `communities/${communityData.id}`), {
				numberOfMembers: increment(1),
			});

			await batch.commit();

			setCommunityStateValue((prev) => ({
				...prev,
				mySnippets: [
					...prev.mySnippets,
					{
						communityId: communityData.id,
						isModerator: false,
					},
				],
			}));
		} catch (error: any) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	const leave = async (communityId: string) => {
		setIsLoading(true);
		try {
			if (!currentUser?.uid) return;

			const batch = writeBatch(firestore);

			batch.delete(
				doc(
					firestore,
					`users/${currentUser.uid}/communitySnippets/${communityId}`
				)
			);

			batch.update(doc(firestore, `communities/${communityId}`), {
				numberOfMembers: increment(-1),
			});
			await batch.commit();

			setCommunityStateValue((prev) => ({
				...prev,
				mySnippets: prev.mySnippets.filter(
					(item) => item.communityId !== communityId
				),
			}));
		} catch (error: any) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	const getMySnippets = useCallback(async () => {
		setIsLoading(true);
		const snapshots = await getDocs(
			collection(firestore, `users/${currentUser?.uid}/communitySnippets`)
		);

		const snippets = snapshots.docs.map((item) => ({
			...item.data(),
		}));

		setCommunityStateValue((prev) => ({
			...prev,
			mySnippets: snippets as CommunitySnippet[],
		}));
		setIsLoading(false);
	}, [currentUser?.uid, setCommunityStateValue]);

	useEffect(() => {
		if (currentUser?.uid) {
			getMySnippets();
		}
	}, [currentUser?.uid, getMySnippets]);

	return {
		isLoading,
		error,
		join,
		leave,
		onJoinOrLeave,
		communityStateValue,
		setCommunityStateValue,
	};
};

export default useCommunity;
