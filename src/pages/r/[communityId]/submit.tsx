import PageContent from '@/src/components/Layout/PageContent';
import NewPostForm from '@/src/components/Post/NewPostForm';

type Props = {};

const SubmitPost = (props: Props) => {
	return (
		<PageContent>
			<NewPostForm />
			<>about community </>
		</PageContent>
	);
};

export default SubmitPost;
