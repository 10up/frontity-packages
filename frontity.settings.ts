const publicPath = process.env.PUBLIC_PATH || 'static';

const settings = {
	name: '10up-frontity-packages',
	state: {
		frontity: {
			url: 'https://test.frontity.org',
			title: 'Test Frontity Blog',
			description: 'WordPress installation for Frontity development',
		},
	},
	packages: [
		{
			name: '@10up/frontity-build-config',
			state: {
				TenUpBuildConfig: {
					publicPath,
				},
			},
		},

		{
			name: '@10up/twentypress',
			state: {
				theme: {
					menu: [
						['Home', '/'],
						['Art', '/category/art/'],
						['Art-Design', '/category/art-design/'],
						['Africa', '/category/africa/'],
					],
					featured: {
						showOnList: false,
						showOnPost: false,
					},
					autoPrefetch: 'in-view',
				},
			},
		},
		{
			name: '@frontity/wp-source',
			state: {
				source: {
					url: 'https://test.frontity.org',
				},
			},
		},
		'@frontity/tiny-router',
		'@frontity/html2react',
	],
};

export default settings;
