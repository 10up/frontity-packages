import WebpackConfig from '../types';
import Root from './components/Root';

const settings: WebpackConfig = {
	name: '@10up/frontity-webpack-config',
	roots: {
		TenUpBuildConfig: Root,
	},
	state: {
		tenupbuildconfig: {
			hasStaticCSS: false,
			publicPath: '/static',
		},
	},
};

export default settings;
