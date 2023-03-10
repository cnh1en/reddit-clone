import PageContent from '@/src/components/Layout/PageContent';
import NewPostForm from '@/src/components/Post/PostForm/NewPostForm';
import { auth } from '@/src/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {};

const SubmitPost = (props: Props) => {
	const [currentUser] = useAuthState(auth);

	return (
		<PageContent>
			{currentUser && <NewPostForm user={currentUser} />}
			<>about community </>
		</PageContent>
	);
};

export default SubmitPost;
