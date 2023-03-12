import { auth, firestore, storage } from '@/src/firebase/clientApp';
import useCommunity from '@/src/hooks/useCommunity';
import useSelectFile from '@/src/hooks/useSelectFile';
import { Community, CommunityState } from '@/src/types';
import {
	Box,
	Button,
	Divider,
	Flex,
	Icon,
	Image,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useCallback, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsCalendarWeek, BsThreeDots } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';

type AboutProps = {
	communityData: Community;
};

const About = ({ communityData }: AboutProps) => {
	const [currentUser] = useAuthState(auth);
	const { communityStateValue, setCommunityStateValue } = useCommunity();
	const { selectedFiles, setSelectedFiles, onSelectImage } = useSelectFile();

	const imageRef = useRef<HTMLInputElement>(null);

	const changeAvatarCommunity = useCallback(async () => {
		try {
			const communityRef = ref(storage, `community/${communityData.id}/image`);
			await uploadString(communityRef, selectedFiles[0] as string, 'data_url');
			const imageURL = await getDownloadURL(communityRef);

			await updateDoc(doc(firestore, `communities/${communityData.id}`), {
				imageURL,
			});

			setCommunityStateValue((prev: CommunityState) => ({
				...prev,
				currentCommunity: {
					...(prev.currentCommunity as Community),
					imageURL: imageURL,
				},
			}));
		} catch (error) {
			console.log('error changeAvatarCommunity', error);
		}
	}, [communityData.id, selectedFiles, setCommunityStateValue]);

	useEffect(() => {
		setSelectedFiles([]);
	}, [setSelectedFiles]);

	useEffect(() => {
		if (selectedFiles[0]) {
			changeAvatarCommunity();
		}
	}, [changeAvatarCommunity, selectedFiles]);

	return (
		<Box position="sticky" bgColor="white" fontSize={14} fontWeight="bold">
			<Flex
				padding={3}
				px={4}
				bgColor="blue.500"
				justify="space-between"
				align="center"
				color="white"
			>
				<Text fontWeight="bold" fontSize={13}>
					About Community
				</Text>
				<Icon as={BsThreeDots} />
			</Flex>

			<Box padding={3} px={4}>
				<Stack spacing={4}>
					<Flex justify="center" align="center">
						<Stack flexGrow={1}>
							<Text>{communityData.numberOfMembers}</Text>
							<Text>Members</Text>
						</Stack>

						<Stack flexGrow={1}>
							<Text>1</Text>
							<Text>Online</Text>
						</Stack>
					</Flex>
					<Divider />

					<Flex align="center" gap={3} fontWeight="normal">
						<Icon as={BsCalendarWeek} fontSize={20} />

						<Text>
							Created{' '}
							{dayjs(
								(communityData.createdAt?.seconds as number) * 1000
							).format('MMMM D, YYYY')}
						</Text>
					</Flex>
				</Stack>
				<Button width="full" my={4}>
					Create Post
				</Button>
				{currentUser?.uid == communityData.creatorId && (
					<Stack>
						<Text>Admin</Text>
						<Flex justify="space-between" fontWeight="normal" color="blue.500">
							<input
								type="file"
								accept="image/*"
								hidden
								ref={imageRef}
								onChange={onSelectImage}
							/>
							<Link onClick={() => imageRef.current?.click()}>
								Change Image
							</Link>

							{communityStateValue.currentCommunity?.imageURL ? (
								<Image
									src={communityStateValue.currentCommunity?.imageURL}
									alt=""
									width={12}
									height={12}
									borderRadius={9999}
								/>
							) : (
								<Icon
									as={FaReddit}
									fontSize={42}
									position="relative"
									top="-4"
									border="4px solid white"
									borderRadius="50%"
									color="blue.500"
								/>
							)}
						</Flex>
					</Stack>
				)}
			</Box>
		</Box>
	);
};

export default About;
