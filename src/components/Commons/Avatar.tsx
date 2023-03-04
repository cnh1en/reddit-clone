import { Avatar, AvatarBadge, Icon, ResponsiveValue } from '@chakra-ui/react';
import { FaRedditSquare } from 'react-icons/fa';

type AvatarProps = {
	photoUrl?: string | null;
	size?:
		| ResponsiveValue<
				| (string & {})
				| 'sm'
				| 'md'
				| 'lg'
				| 'xl'
				| '2xl'
				| 'full'
				| '2xs'
				| 'xs'
		  >
		| undefined;
};

const RedditAvatar = ({ size, photoUrl }: AvatarProps) => {
	return photoUrl ? (
		<Avatar src={photoUrl} size={size}>
			<AvatarBadge boxSize="1.25em" bg="green.500" />
		</Avatar>
	) : (
		<Icon as={FaRedditSquare} color="gray.300" fontSize={32} />
	);
};

export default RedditAvatar;
