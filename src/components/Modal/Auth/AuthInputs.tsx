import { AuthModalStateAtom } from '@/src/atoms/authModalAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';

const AuthInputs = () => {
	const { view } = useRecoilValue(AuthModalStateAtom);

	return (
		<>
			{view === 'login' && <Login />}
			{view === 'signup' && <Signup />}
			{view === 'resetPassword' && <ResetPassword />}
		</>
	);
};

export default AuthInputs;
