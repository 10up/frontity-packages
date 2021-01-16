import { ReactType } from 'react';
import { Package } from 'frontity/types';

import { AutoPrefetch } from '@frontity/components/link/types';
import Html2React from '@frontity/html2react/types';

/**
 * 10up theme scaffold types
 */
interface ThemeScaffold extends Package {
	name: string;
	/**
	 * Root components exposed by this package.
	 */
	roots: {
		/**
		 * In Frontity, any package can add React components to the site.
		 * We use roots for that, scoped to the `theme` namespace.
		 */
		theme: ReactType;
	};

	/**
	 * The state exposed by this package.
	 */
	state: {
		/**
		 * Theme namespace.
		 */
		theme: {
			/**
			 * The auto prefetch setting. Defined in {@link AutoPrefetch}.
			 */
			autoPrefetch: AutoPrefetch;
		};
	};

	/**
	 * The libraries exposed by this package.
	 */
	libraries: {
		/**
		 * The Html2React namespace.
		 */
		html2react: {
			/**
			 * The Html2React processors.
			 */
			processors: Html2React['libraries']['html2react']['processors'];
		};
	};
}

export default ThemeScaffold;
