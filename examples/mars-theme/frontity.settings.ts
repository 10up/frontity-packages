export default {
	name: 'mars-theme',
	state: {
		frontity: {
			url: 'https://mars.frontity.org',
			title: 'Test Frontity Blog',
			description: 'Useful content for Frontity development',
		},
	},
	packages: [
		'@frontity/tiny-router',
		'@frontity/html2react',
		{
			name: '@frontity/mars-theme',
			state: {
				theme: {
					menu: [
						['Home', '/'],
						['Nature', '/category/nature/'],
						['Travel', '/category/travel/'],
						['Japan', '/tag/japan/'],
						['About Us', '/about-us/'],
					],
					featured: {
						showOnList: true,
						showOnPost: true,
					},
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
		'@10up/frontity-elasticpress',
	],
};
