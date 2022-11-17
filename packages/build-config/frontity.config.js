const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports.webpack = ({ config, mode, target }) => {
	const shouldUseStyleLoader = mode === 'development' && ['es5', 'module'].includes(target);
	const styleOrExtractionPlugin = shouldUseStyleLoader
		? {
				loader: 'style-loader',
		  }
		: {
				loader: MiniCSSExtractPlugin.loader,
				options: {
					emit: target === 'server',
				},
		  };

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
				loader: require.resolve('postcss-loader'),
				options: {
					postcssOptions: {
						config: path.join(__dirname, 'src', 'config', 'postcss.config.js'),
					},
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
		use: [{ loader: '@svgr/webpack', options: { namedExport: 'SVG' } }, 'file-loader'],
	});

	if (!shouldUseStyleLoader) {
		config.plugins.push(
			new MiniCSSExtractPlugin({
				filename: (pathData) => {
					return pathData.chunk.name === 'main'
						? 'static/index.[contenthash].css'
						: '[name].[contenthash].css';
				},
			}),
		);
	}
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
