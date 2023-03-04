/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Icon,
} from '@chakra-ui/react';
import { IoMdLock } from 'react-icons/io';
import { AiFillEye } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '@/src/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseUser } from '@/src/types';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const CreateCommunity = ({ isOpen, onClose }: Props) => {
	const [user] = useAuthState(auth);
	const [communityType, setCommunityType] = useState('public');
	const [communityName, setCommunityName] = useState('');
	const [charsRemaining, setCharsRemaining] = useState(21);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > 21) return;

		setCommunityName(event.target.value);
		setCharsRemaining(21 - event.target.value.length);
	};

	const onCommunityTypeChange = (value: string) => {
		setCommunityType(value);
	};

	const handleCreateCommunity = async () => {
		try {
			const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

			if (format.test(communityName) || communityName.length < 3) {
				setError(
					'Community names must be between 3-21 characrters, and can not contain special characters'
				);
				return;
			}

			const communityRef = doc(firestore, 'communities', communityName); // reference
			const communityDoc = await getDoc(communityRef);

			if (communityDoc.exists()) {
				setError(`Sorry, r/${communityName} is already taken. Try another`);
				return;
			}

			setIsLoading(true);
			await setDoc(communityRef, {
				creatorId: (user as FirebaseUser)['uid'],
				privacyType: communityType,
				numberOfMembers: 1,
				createdAt: serverTimestamp(),
			});
		} catch (error) {
			console.log('[LOG] ~ handleCreateCommunity:', error);
		}
		setIsLoading(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} trapFocus={false} size="xl">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader fontSize={16}>Create a community</ModalHeader>
				<ModalBody>
					<Box>
						<Text fontSize={14} fontWeight="bold">
							Name
						</Text>
						<Text fontSize={12}>
							Community names including capitalization cannot be changed.
						</Text>
					</Box>

					<Box mt={3}>
						<InputGroup>
							<InputLeftAddon children="r/" />
							<Input
								type="text"
								onChange={handleChange}
								onFocus={() => setError('')}
							/>
						</InputGroup>
						<Text fontSize={10} mt={2}>
							{charsRemaining} Characters remaining
						</Text>
					</Box>

					{error && (
						<Text fontSize={12} mt={2} color="red">
							{error}
						</Text>
					)}

					<Box>
						<Text fontWeight="bold" fontSize={16} my={3}>
							Community type
						</Text>
						<RadioGroup onChange={onCommunityTypeChange}>
							<Stack direction="column" spacing={2}>
								<Radio value="public">
									<Flex direction="row" align="center" gap={2}>
										<Icon as={BsFillPersonFill} color="gray.700" />
										<Flex align="center" gap={2}>
											<Text fontSize={14} fontWeight="bold" color="gray.700">
												Public
											</Text>
											<Text fontSize={10}>
												Anyone can view, post, and comment to this community
											</Text>
										</Flex>
									</Flex>
								</Radio>
								<Radio value="restricted">
									<Flex direction="row" align="center" gap={2}>
										<Icon as={AiFillEye} color="gray.700" />
										<Flex align="center" gap={2}>
											<Text fontSize={14} fontWeight="bold" color="gray.700">
												Restricted
											</Text>
											<Text fontSize={10}>
												Anyone can view this community, but only approved users
												can post
											</Text>
										</Flex>
									</Flex>
								</Radio>
								<Radio value="private">
									<Flex direction="row" align="center" gap={2}>
										<Icon as={IoMdLock} color="gray.700" />
										<Flex align="center" gap={2}>
											<Text fontSize={14} fontWeight="bold" color="gray.700">
												Private
											</Text>
											<Text fontSize={10}>
												Only approved users can view and submit to this
												community
											</Text>
										</Flex>
									</Flex>
								</Radio>
							</Stack>
						</RadioGroup>
					</Box>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="outline"
						onClick={handleCreateCommunity}
						isLoading={isLoading}
					>
						Create Community
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateCommunity;
