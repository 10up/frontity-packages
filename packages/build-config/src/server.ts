import WebpackConfig from '../types';
import client from './client';

const fs = require('fs');
const path = require('path');

const settings: WebpackConfig = {
	...client,
	actions: {
		tenupbuildconfig: {
			beforeSSR: ({ state }) => {
				const cssPath = path.join(
					process.cwd(),
					'build',
					state.tenupbuildconfig.publicPath,
					'css',
					'index.css',
				);

				fs.stat(cssPath, (error, stats) => {
					if (!error && stats.isFile()) {
						state.tenupbuildconfig.hasStaticCSS = true;
					}
				});
			},
		},
	},
};

export default settings;
