import { ReactType } from 'react';
import { Action, Package } from 'frontity/types';

/**
 * OfflineSupport package type
 */
interface OfflineSupport extends Package {
	name: string;
	roots: {
		offlineSupport: ReactType;
	};
	actions: {
		offlineSupport: {
			init: Action<OfflineSupport>;
		};
	};
}

export default OfflineSupport;
