import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import { extendBaseTheme } from '@chakra-ui/react';

const theme = extendBaseTheme({
	colors: {
		brand: {
			100: '#FF3C00',
		},
	},
	fonts: {
		body: 'Open sans, sans-serif',
	},
	styles: {
		global: () => ({
			body: {
				bg: 'gray.200',
			},
		}),
	},
	components: {},
});

export default theme;
