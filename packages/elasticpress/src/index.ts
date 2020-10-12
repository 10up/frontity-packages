import { runEPQuery, buildQuery, searchQuery, getESEndpoint } from '@10up/elasticpress-react';
import { Pattern, Handler } from '@frontity/wp-source/types';
import { fetch } from 'frontity';
import ElasticPress, { Packages } from '../types';
import { relatedPost, search } from './handlers';
import { withElasticPress } from './hocs';

// polyfill global fetch
const global =
	(typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window);

if (!global.fetch) {
	global.fetch = fetch;
}

const epRelatedPostsHandler: Pattern<Handler<Packages>> = {
	name: 'epRelatedPosts',
	priority: 10,
	pattern: '@posts/:postId(\\d+)/related',
	func: relatedPost,
};

const epSearchHandler: Pattern<Handler<Packages>> = {
	name: 'epSearch',
	priority: 1,
	pattern: '/',
	func: search,
};

const elasticpress: ElasticPress = {
	name: '@10up/frontity-elasticpress',
	libraries: {
		source: {
			handlers: [epRelatedPostsHandler, epSearchHandler],
		},
		elasticpress: {
			runEPQuery,
			buildQuery,
			searchQuery,
			getESEndpoint,
		},
	},
	state: {
		elasticpress: {
			node: '',
			indexName: '',
			loadInitialData: true,
		},
	},
};

export default elasticpress;
export { withElasticPress };
