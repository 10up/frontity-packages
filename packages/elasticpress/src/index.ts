import { runEPQuery, buildQuery, searchQuery } from '@10up/elasticpress-react';
import { fetch } from 'frontity';
import ElasticPress from '../types';
import { relatedPost, search } from './handlers';
import { withElasticPress } from './hocs';

// polyfill global fetch
const global =
	(typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window);

if (!global.fetch) {
	global.fetch = fetch;
}

const elasticpress: ElasticPress = {
	name: '@10up/frontity-elasticpress',
	libraries: {
		source: {
			handlers: [
				{
					name: 'epRelatedPosts',
					priority: 10,
					pattern: '@posts/:postId(\\d+)/related',
					func: relatedPost,
				},
				{
					name: 'epSearch',
					priority: 1,
					pattern: '/',
					func: search,
				},
			],
		},
		elasticpress: {
			runEPQuery,
			buildQuery,
			searchQuery,
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
