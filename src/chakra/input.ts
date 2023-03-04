import { ComponentStyleConfig } from '@chakra-ui/react';

export const Input: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {
		_focus: {
			outline: 'none',
			bg: 'white',
			border: '1px solid',
			borderColor: 'blue.500',
		},
		_placeholder: {
			color: 'gray.500',
			fontSize: '12px',
		},
		_hover: {
			bg: 'white',
			border: '1px solid',
			borderColor: 'blue.500',
		},
		bg: 'gray.50',
	},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		size: '12pt',
		variant: '',
		colorScheme: '',
	},
};
