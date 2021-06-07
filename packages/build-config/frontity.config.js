const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports.webpack = ({ config, mode, target }) => {
	const styleOrExtractionPlugin =
		mode === 'development' && ['es5', 'module'].includes(target)
			? {
					loader: 'style-loader',
			  }
			: { loader: MiniCSSExtractPlugin.loader };

	config.module.rules.push({
		test: /\.(sc|sa)ss$/,
		exclude: /\.module\.css$/,
		use: [
			styleOrExtractionPlugin,
			{
				loader: require.resolve('css-loader'),
				options: {
					sourceMap: mode === 'development',
					url: true,
				},
			},
			{
				loader: require.resolve('sass-loader'),
				options: {
					sourceMap: mode === 'development',
				},
			},
		],
	});

	const cssRule = config.module.rules.findIndex(
		(rule) => rule.test.toString() === /\.css$/.toString(),
	);

	if (cssRule >= 0) {
		config.module.rules[cssRule] = {
			test: /\.css$/,
			exclude: /\.module\.css$/,
			use: [
				styleOrExtractionPlugin,
				{
					loader: require.resolve('css-loader'),
					options: {
						sourceMap: mode === 'development',
						url: true,
					},
				},
				{
					loader: require.resolve('postcss-loader'),
					options: {
						postcssOptions: {
							config: path.join(__dirname, 'src', 'config', 'postcss.config.js'),
						},
					},
				},
			],
		};
	}

	// CSS Modules
	config.module.rules.push({
		test: /\.module\.css$/,
		use: [
			styleOrExtractionPlugin,
			{
				loader: require.resolve('css-loader'),
				options: {
					sourceMap: mode === 'development',
					url: true,
					import: false,
					modules: true,
				},
			},
			{
				loader: require.resolve('postcss-loader'),
				options: {
					postcssOptions: {
						config: path.join(__dirname, 'src', 'config', 'postcss.config.js'),
					},
				},
			},
		],
	});

	// svg
	const fileLoaderRule = config.module.rules.findIndex(
		(rule) => rule.test.toString() === /\.(png|jpe?g|gif|svg)$/.toString(),
	);

	if (fileLoaderRule >= 0) {
		// remove svg from default svg loader
		config.module.rules[fileLoaderRule].test = /\.(png|jpe?g|gif)$/;
	}

	// add @svgr/webpack
	config.module.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});

	config.plugins.push(
		new MiniCSSExtractPlugin({
			filename: () => {
				return `${config.output.publicPath}/css/index.css`;
			},
			chunkFilename: `${config.output.publicPath}/css/[id].css`,
		}),
	);
};

module.exports.babel = ({ config, mode }) => {
	if (mode === 'production') {
		config.plugins.push([
			require.resolve('babel-plugin-transform-react-remove-prop-types'),
			{
				mode: 'remove',
				removeImport: true,
			},
		]);
	}
};
