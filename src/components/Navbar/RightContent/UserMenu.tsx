import { auth } from '@/src/firebase/clientApp';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { CgLogOut, CgProfile } from 'react-icons/cg';
import { IoSparkles } from 'react-icons/io5';
import RedditAvatar from '../../Commons/Avatar';
import type { FirebaseUser } from '@/src/types';
import { useSetRecoilState } from 'recoil';
import { AuthModalStateAtom } from '@/src/atoms/authModalAtom';
import { CommunityStateAtom } from '@/src/atoms/communityAtom';

type UserMenuProps = {
	user?: FirebaseUser | null;
};

const UserMenu = ({ user }: UserMenuProps) => {
	const [signOut] = useSignOut(auth);
	const setAuthModal = useSetRecoilState(AuthModalStateAtom);
	const resetCommunityState = useSetRecoilState(CommunityStateAtom);

	const logout = () => {
		resetCommunityState({ mySnippets: [] });
		signOut();
	};

	if (!user) {
		return (
			<Menu>
				<MenuButton as={Box}>
					<Flex align="center">
						<RedditAvatar size="md" />
					</Flex>
				</MenuButton>

				<MenuList>
					<MenuItem
						_hover={{
							bg: 'blue.500',
							color: 'white',
						}}
						fontWeight="semibold"
						onClick={() => setAuthModal({ view: 'login', open: true })}
					>
						<Flex align="center" gap={3}>
							<Icon as={CgProfile} fontSize={20} />
							<Text>Log in / Sign up</Text>
						</Flex>
					</MenuItem>
				</MenuList>
			</Menu>
		);
	}

	return (
		<Menu>
			<MenuButton as={Box}>
				<Flex align="center" gap={2}>
					<RedditAvatar photoUrl={user?.photoURL} size="sm" />

					<Flex direction="column">
						<Text fontSize={12}>{user?.displayName}</Text>
						<Flex align="center">
							<Icon as={IoSparkles} color="brand.100" mr={1} />
							<Text color="gray.400" fontSize={12}>
								1 karma
							</Text>
						</Flex>
					</Flex>
					<ChevronDownIcon fontSize={20} />
				</Flex>
			</MenuButton>
			<MenuList>
				<MenuItem
					_hover={{
						bg: 'blue.500',
						color: 'white',
					}}
					fontWeight="semibold"
				>
					<Flex align="center" gap={3}>
						<Icon as={CgProfile} fontSize={20} />
						<Text>Profile</Text>
					</Flex>
				</MenuItem>
				<MenuDivider />
				<MenuItem
					onClick={logout}
					_hover={{
						bg: 'blue.500',
						color: 'white',
					}}
					fontWeight="semibold"
				>
					<Flex align="center" gap={3}>
						<Icon as={CgLogOut} fontSize={20} />
						<Text>Log out</Text>
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default UserMenu;
