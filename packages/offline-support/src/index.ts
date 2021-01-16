import OfflineSupport from '../types';
import App from './App';

const settings: OfflineSupport = {
	name: '@10up/frontity-offline-support',
	roots: {
		offlineSupport: App,
	},
	actions: {
		offlineSupport: {
			init: () => {
				// initialize service worker
			},
		},
	},
	state: {
		offlineSupport: {},
	},
};

export default settings;
