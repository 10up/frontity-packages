import { BabelCustomizer, WebpackCustomizer } from '@frontity/types';

const path = require('path');

export const webpack: WebpackCustomizer = ({ config, mode }) => {
	config.module.rules.push({
		test: /\.(sc|sa)ss$/,
		use: [
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

	config.module.rules[cssRule] = {
		test: /\.css$/,
		use: [
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
						config: path.join(path.dirname(__dirname), 'config', 'postcss.config.js'),
					},
				},
			},
		],
	};
};

export const babel: BabelCustomizer = ({ config, mode }) => {
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
