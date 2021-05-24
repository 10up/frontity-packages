import { Package } from 'frontity/types';

interface WebpackConfig extends Package {
	/**
	 * The name of this package.
	 */
	name: '@10up/frontity-webpack-config';
	state?: {
		tenupbuildconfig: {
			hasStaticCSS?: boolean;
			publicPath?: string;
		};
	};
	actions?: {};
}

/**
 * The Packages type is a merge of all dependent packages.
 */
export type Packages = WebpackConfig;

export default WebpackConfig;
