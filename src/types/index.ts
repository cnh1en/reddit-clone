import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export type ViewModalProps = 'login' | 'signup' | 'resetPassword';
export type FirebaseUser = User;

export type Community = {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	privacyType: 'public' | 'restricted' | 'private';
	createAt?: Timestamp;
	imageURL?: string;
};

export type CommunitySnippet = {
	communityId: string;
	isModerator: boolean;
	imageURL?: string;
};

export type CommunityState = {
	mySnippets: CommunitySnippet[];
};

export type Post = {
	id?: string;
	communityId: string;
	creatorId: string;
	creatorDisplayName: string;
	title: string;
	body: string;
	numberOfComments: number;
	voteStatus: number;
	imageURL?: string;
	communityImageURL?: string;
	createdAt: Timestamp;
};

export type PostState = {
	selectedPost: Post | null;
	posts: Post[];
};
