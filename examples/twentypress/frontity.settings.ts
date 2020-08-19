import { Settings } from 'frontity/types';

const settings: Settings = {
	name: 'twentypress example theme',
	state: {
		frontity: {
			url: 'https://test.frontity.org',
			title: 'Test Frontity Blog',
			description: 'WordPress installation for Frontity development',
		},
	},
	packages: [
		'@frontity/tiny-router',
		'@frontity/html2react',
		{
			name: '@frontity/wp-source',
			state: {
				source: {
					api: 'http://elasticpress.test/wp-json',
				},
			},
		},
	],
};

export default settings;
