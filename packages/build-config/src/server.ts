import TenUpBuildConfig from '../types';
import client from './client';

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const settings: TenUpBuildConfig = {
	...client,
	actions: {
		TenUpBuildConfig: {
			beforeSSR: ({ state }: TenUpBuildConfig) => {
				const cssPath = path.join(process.cwd(), 'build', 'static', 'css', 'index.css');

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
