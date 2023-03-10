import React from 'react';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { Community } from '@/src/types';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/src/components/Community/NotFound';
import Header from '@/src/components/Community/Header';
import PageContent from '@/src/components/Layout/PageContent';
import CreatePostLink from '@/src/components/Community/CreatePostLink';
import Posts from '@/src/components/Post/Posts';

type CommunityProps = {
	communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityProps) => {
	if (!communityData) {
		return <NotFound />;
	}

	return (
		<>
			<Header communityData={communityData} />
			<PageContent>
				<>
					<CreatePostLink />
					<Posts communityData={communityData} />
				</>
				<></>
			</PageContent>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const communityRef = doc(
		firestore,
		'communities',
		ctx.query.communityId as string
	);

	const communityDoc = await getDoc(communityRef);

	return {
		props: {
			communityData: communityDoc.exists()
				? JSON.parse(
						safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
				  )
				: false,
		},
	};
};

export default CommunityPage;
