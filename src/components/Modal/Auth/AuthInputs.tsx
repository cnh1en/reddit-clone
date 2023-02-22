import { authModalState } from '@/src/atoms/authModalAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Login from './Login';
import Signup from './Signup';

type Props = {};

const AuthInputs = (props: Props) => {
	const authModal = useRecoilValue(authModalState);

	return (
		<>
			{authModal.view === 'login' && <Login />}
			{authModal.view === 'signup' && <Signup />}
		</>
	);
};

export default AuthInputs;
