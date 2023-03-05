import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageContentProps = {
	children: ReactNode;
};

const PageContent = ({ children }: PageContentProps) => {
	return (
		<Flex justify="center" padding="16px 0px" border="1px solid red">
			<Flex
				width="95%"
				justify="center"
				maxWidth="960px"
				border="solid 1px green"
			>
				<Flex
					direction="column"
					width={{
						base: '100%',
						md: '65%',
					}}
					border="1px solid blue"
				>
					{children && children[0 as keyof typeof children]}
				</Flex>
				<Flex
					direction="column"
					display={{
						base: 'none',
						md: 'flex',
					}}
					border="1px solid yellow"
					flexGrow={1}
				>
					{children && children[1 as keyof typeof children]}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PageContent;
