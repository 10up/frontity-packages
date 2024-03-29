import { Frontity, Package, MergePackages } from 'frontity/types';

interface TenUpBuildConfig extends Package {
	/**
	 * The name of this package.
	 */
	name: '@10up/frontity-webpack-config';
	state?: {
		TenUpBuildConfig: {
			hasStaticCSS?: boolean;
			cssfilename?: string;
			publicPath?: string;
		};
	};
	actions?: {};
}

/**
 * The Packages type is a merge of all dependent packages.
 */
export type Packages = MergePackages<TenUpBuildConfig, Frontity>;

export default TenUpBuildConfig;
