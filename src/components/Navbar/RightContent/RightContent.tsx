import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import UserMenu from './UserMenu';
import { FirebaseUser } from '@/src/types';

type RightContentProps = {
	user?: FirebaseUser | null;
	isLoading: boolean;
};

const RightContent = ({ user, isLoading }: RightContentProps) => {
	if (isLoading) {
		return (
			<Flex justify="center" align="center" gap={3}>
				<Skeleton
					height="30px"
					width={{
						base: 'none',
						md: '200px',
					}}
				/>
				<SkeletonCircle size="10" />
			</Flex>
		);
	}

	return (
		<>
			<AuthModal />

			<Flex justify="center" align="center" gap={3}>
				{user ? <Icons /> : <AuthButtons />}
				<UserMenu user={user} />
			</Flex>
		</>
	);
};

export default RightContent;
