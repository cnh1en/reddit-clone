import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { BsLink, BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import ImageUpload from './ImageUpload';
import TabItem from './TabItem';
import TextInputs from './TextInputs';

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

const NewPostForm = () => {
	const [selectedTab, setSelectedTab] = useState<SelectedTabType>(
		formTabs[0].title
	);
	const [textInputs, setTextInputs] = useState({
		title: '',
		body: '',
	});
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	const handleCreatePost = () => {};

	const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files as FileList).map((file) =>
			URL.createObjectURL(file)
		);
		setSelectedFiles((prev) => [...prev, ...files]);
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
				<TextInputs onChange={onTextChange} textInputs={textInputs} />
			)}

			{selectedTab === 'Images & Video' && (
				<ImageUpload onSelectFile={onSelectImage} images={selectedFiles} />
			)}
		</Flex>
	);
};

export default NewPostForm;
