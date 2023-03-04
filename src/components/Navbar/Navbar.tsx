import { auth } from '@/src/firebase/clientApp';
import { Flex, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const Navbar = () => {
	const [currentUser, loading] = useAuthState(auth);

	return (
		<Flex
			bg="white"
			height="50px"
			padding="6px 12px"
			alignItems="center"
			gap={1}
		>
			<Image src="/images/redditlogo.png" alt="reddit" width={80} height={80} />
			{currentUser && <Directory />}
			<SearchInput />
			<RightContent user={currentUser} isLoading={loading} />
		</Flex>
	);
};

export default Navbar;
