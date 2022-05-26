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
				const cssPath = path.join(process.cwd(), 'build', 'static');
				fs.readdir(cssPath, (err, files) => {
					if (err) {
						state.TenUpBuildConfig.hasStaticCSS = false;
					} else {
						files.forEach((file) => {
							if (file.match(/index\.?.+\.?css/)) {
								state.TenUpBuildConfig.hasStaticCSS = true;
								state.TenUpBuildConfig.cssfilename = file;
							}
						});
					}
				});
			},
		},
	},
};

export default settings;
