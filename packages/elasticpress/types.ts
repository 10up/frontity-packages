import { Package } from 'frontity/types';
import WpSource, { Pattern, Handler } from '@frontity/wp-source/types';
import Router from '@frontity/router/types';
import { AuthorEntity } from '@frontity/source/types';

export type WithElasticPressType = (Comp: Function) => Function;

export type EPAuthor = {
	id: number;
	display_name: string;
	login: string;
	raw: string;
	/**
	 * The link is not included by default in ElasticPress, but will be used if avaliable.
	 */
	link?: string;
	/**
	 * The description is not included by default, but will be used if avaliable.
	 */
	description?: AuthorEntity['description'];
	/**
	 * The avatar_urls are not included by default, but will be used if avaliable.
	 */
	avatar_urls?: AuthorEntity['avatar_urls'];
};

export type EPTerm = {
	term_id: number;
	slug: string;
	name: string;
	term_taxonomy_id: number;
	temr_order: number;
	/**
	 * The link is not included by default, but will be used if avaliable
	 */
	link?: string;
};

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
			handlers: Pattern<Handler<Packages>>[];
		};

		elasticpress: {
			buildQuery: (
				epQuery: Object,
				search: { searchTerm: string; perPage: number; offset: number },
			) => Object;
			runEPQuery: (
				searchTerm: string,
				query: Object,
				endpoint: string,
				hitMap: (hit: { _source }) => Object,
			) => { results: Object[]; totalResults: number };
			searchQuery: Object;
			getESEndpoint: (type: string, config: ElasticPress['state']['elasticpress']) => string;
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
			loadInitialData?: boolean;
		};
	};
}

/**
 * The Packages type is a merge of all dependent packages.
 */
export type Packages = Omit<ElasticPress, 'name'> & Router<Packages> & Omit<WpSource, 'name'>;

export default ElasticPress;
