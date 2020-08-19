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
			name: '@10up/twentypress-theme',
			state: {
				theme: {
					menu: [
						['Home', '/'],
						['Nature', '/category/nature/'],
						['Travel', '/category/travel/'],
						['Japan', '/tag/japan/'],
						['About Us', '/about-us/'],
					],
					colors: {
						primary: '#E6324B',
						headerBg: '#ffffff',
						footerBg: '#ffffff',
						bodyBg: '#f5efe0',
					},
					showSearchInHeader: true,
					showAllContentOnArchive: false,
					featuredMedia: {
						showOnArchive: true,
						showOnPost: true,
					},
					autoPreFetch: 'hover',
					fontSets: 'us-ascii',
				},
			},
		},
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
