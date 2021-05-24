import { BabelCustomizer, WebpackCustomizer } from '@frontity/types';

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

export const webpack: WebpackCustomizer = ({ config, mode }) => {
	config.module.rules.push({
		test: /\.(sc|sa)ss$/,
		use: [
			{
				loader: MiniCSSExtractPlugin.loader,
			},
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
				loader: MiniCSSExtractPlugin.loader,
			},
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

	config.plugins.push(
		new MiniCSSExtractPlugin({
			filename: () => {
				return `${config.output.publicPath}/css/index.css`;
			},
			chunkFilename: '[id].css',
		}),
	);
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
