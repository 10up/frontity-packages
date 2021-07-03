import TenUpBuildConfig from '../types';
import Root from './components/Root';

const settings: TenUpBuildConfig = {
	name: '@10up/frontity-webpack-config',
	roots: {
		TenUpBuildConfig: Root,
	},
	state: {
		TenUpBuildConfig: {
			hasStaticCSS: false,
			cssfilename: '',
			publicPath: '/static',
		},
	},
};

export default settings;
