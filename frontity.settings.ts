const settings = {
	name: 'frontity-packages',
	state: {
		frontity: {
			url: 'https://test.frontity.org',
			title: 'Test Frontity Blog',
			description: 'WordPress installation for Frontity development',
		},
	},
	packages: [
		{
			name: '@10up/twentypress',
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
						showOnList: false,
						showOnPost: false,
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
		'@frontity/tiny-router',
		'@frontity/html2react',
		{
			name: '@10up/frontity-elasticpress',
			state: {
				elasticpress: {
					node: 'http://elasticpress.test/__elasticsearch',
					indexName: 'elasticpresstest-post-1',
					loadInitialData: true,
				},
			},
		},
	],
};

export default settings;
