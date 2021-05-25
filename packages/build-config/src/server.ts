import TenUpBuildConfig from '../types';
import client from './client';

const fs = require('fs');
const path = require('path');

const settings: TenUpBuildConfig = {
	...client,
	actions: {
		TenUpBuildConfig: {
			beforeSSR: ({ state }: TenUpBuildConfig) => {
				const cssPath = path.join(
					process.cwd(),
					'build',
					state.TenUpBuildConfig.publicPath,
					'css',
					'index.css',
				);

				fs.stat(cssPath, (error, stats) => {
					if (!error && stats.isFile()) {
						state.TenUpBuildConfig.hasStaticCSS = true;
					}
				});
			},
		},
	},
};

export default settings;
