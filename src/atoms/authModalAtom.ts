import { atom } from 'recoil';

export type AuthModalStateProps = {
	open: boolean;
	view: 'login' | 'signup' | 'resetPassword';
};
export const authModalState = atom<AuthModalStateProps>({
	key: 'authModalState',
	default: {
		open: false,
		view: 'login',
	},
});
