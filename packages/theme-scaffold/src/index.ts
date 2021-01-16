import image from '@frontity/html2react/processors/image';
import link from '@frontity/html2react/processors/link';
import ThemeScaffold from '../types';
import App from './App';

const settings: ThemeScaffold = {
	name: 'theme-scaffold',
	roots: {
		theme: App,
	},
	state: {
		theme: {
			autoPrefetch: 'in-view',
		},
	},
	actions: {
		theme: {},
	},
	libraries: {
		html2react: {
			processors: [image, link],
		},
	},
};

export default settings;
