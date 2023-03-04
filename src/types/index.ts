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
