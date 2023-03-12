import { Flex, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const PostLoader = (props: Props) => {
	return (
		<>
			<Stack bgColor="white" padding="10px" mt={5}>
				<SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="4" />
				<Skeleton height="220px" />
			</Stack>

			<Stack bgColor="white" padding="10px" mt={5}>
				<SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="4" />
				<Skeleton height="220px" />
			</Stack>
		</>
	);
};

export default PostLoader;
