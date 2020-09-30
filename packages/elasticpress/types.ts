import { Package } from 'frontity/types';
import WpSource from '@frontity/wp-source/types';
import Router from '@frontity/router/types';
import Source from '@frontity/source/types';

export type WithElasticPressType = (Comp: Function) => Function;

interface ElasticPress extends Package {
	/**
	 * The name of this package.
	 */
	name: '@10up/frontity-elasticpress';

	/**
	 * The libraries exposed by this package.
	 */
	libraries: {
		/**
		 * The custom source handlers.
		 */
		source: {
			handlers: WpSource['libraries']['source']['handlers'];
		};

		elasticpress: {
			buildQuery: () => {};
			runEPQuery: () => {};
			searchQuery: Object;
		};
	};

	/**
	 * The state exposed by this package. It is optional. If not present this package
	 * will try to get this information from ElasticPress.
	 */
	state?: {
		/**
		 * The elasticpress namespace holds all the config for this package.
		 */
		elasticpress: {
			/**
			 * The elasticsearch node
			 *
			 * @example 'https://example.com/__elasticsearch';
			 */
			node: string;

			/**
			 * The index name to use by default
			 *
			 * @example 'elasticpresstest-post-1';
			 */
			indexName: string;

			/**
			 * Whether to load initial data.
			 *
			 * @default true
			 */
			loadInitialData: boolean;
		};
	};
}

/**
 * The Packages type is a merge of all dependent packages.
 */
export type Packages = ElasticPress & Router<Packages> & Source<Packages>;

export default ElasticPress;
