import React, { useEffect, useState } from 'react';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Flex,
	useToast,
} from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { BsLink, BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import ImageUpload from './ImageUpload';
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import { FirebaseUser, Post } from '@/src/types';
import { useRouter } from 'next/router';
import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { firestore, storage } from '@/src/firebase/clientApp';
import {
	getDownloadURL,
	ref,
	uploadBytes,
	uploadString,
} from 'firebase/storage';
import useSelectFile from '@/src/hooks/useSelectFile';

const formTabs = [
	{
		title: 'Post',
		icon: IoDocumentText,
	},
	{
		title: 'Images & Video',
		icon: BsLink45Deg,
	},
	{
		title: 'Link',
		icon: BsLink,
	},
	{
		title: 'Poll',
		icon: BiPoll,
	},
	{
		title: 'Talk',
		icon: BsMic,
	},
] as const;

export type SelectedTabType = typeof formTabs[number]['title'];
export type TabIconProps = typeof formTabs[number]['icon'];
export type TabProps = {
	title: SelectedTabType;
	icon: TabIconProps;
};

type Props = {
	user: FirebaseUser;
};

const NewPostForm = ({ user }: Props) => {
	const [selectedTab, setSelectedTab] = useState<SelectedTabType>(
		formTabs[0].title
	);
	const [textInputs, setTextInputs] = useState({
		title: '',
		body: '',
	});
	const [error, setError] = useState('');

	const { selectedFiles, setSelectedFiles, onSelectImage } = useSelectFile();

	const router = useRouter();

	const handleCreatePost = async () => {
		const { communityId } = router.query;
		const newPost: Post = {
			communityId: communityId as string,
			creatorId: user.uid,
			creatorDisplayName: user.email?.split('@')[0] as string,
			body: textInputs.body,
			title: textInputs.title,
			numberOfComments: 0,
			createdAt: serverTimestamp() as Timestamp,
			voteStatus: 0,
		};

		try {
			const postRef = await addDoc(collection(firestore, 'posts'), newPost);

			if (selectedFiles.length > 0) {
				const imageRef = ref(storage, `post/${postRef.id}/image`);
				await uploadString(imageRef, selectedFiles[0], 'data_url');
				const downloadUrl = await getDownloadURL(imageRef);
				await updateDoc(postRef, {
					imageURL: downloadUrl,
				});
			}
		} catch (error: any) {
			setError(error?.message);
			console.log('handleCreatePost', error);
		}
	};

	const onDeleteImage = () => {
		setSelectedFiles([]);
	};

	const onBackToPost = () => {
		setSelectedTab('Post');
	};

	const onTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setTextInputs((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<Flex direction="column">
			<Flex width="100%" bgColor="white">
				{formTabs.map((item, index) => (
					<TabItem
						key={index}
						item={item}
						selected={item.title === selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				))}
			</Flex>
			{selectedTab === 'Post' && (
				<TextInputs
					onChange={onTextChange}
					textInputs={textInputs}
					onCreatePost={handleCreatePost}
				/>
			)}

			{selectedTab === 'Images & Video' && (
				<ImageUpload
					images={selectedFiles}
					onSelectFile={onSelectImage}
					onDeleteFile={onDeleteImage}
					onBack={onBackToPost}
				/>
			)}

			{error && (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Something error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
		</Flex>
	);
};

export default NewPostForm;
