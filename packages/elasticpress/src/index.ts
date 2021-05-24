import { runEPQuery, buildQuery, searchQuery, getESEndpoint } from '@10up/elasticpress-react';
import { Pattern, Handler } from '@frontity/wp-source/types';
import { fetch } from 'frontity';
import ElasticPress, { Packages } from '../types';
import { relatedPost, search } from './handlers';
import { withElasticPress } from './hocs';

// polyfill global fetch
const theGlobal =
	(typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window);

if (!theGlobal.fetch) {
	theGlobal.fetch = fetch;
}

const epRelatedPostsHandler: Pattern<Handler<Packages>> = {
	name: 'epRelatedPosts',
	priority: 10,
	pattern: '@posts/:postId(\\d+)/related',
	func: relatedPost,
};

/**
 * Regexp to match homepage search URLs.
 *
 * It works like this:
 * 1. Optional initial slash to match URLs like domain.com?s=text.
 * 2. Required "?".
 * 3. Optional number of query parameters before "s=text".
 * 4. Required "s=text".
 *
 * Matching the pagination is not required because Frontity strips it out before
 * doing the match.
 */
export const searchRegExp = '^\\/?\\?(|[^/]+&)?s=[^&$]+';

const epSearchHandler: Pattern<Handler<Packages>> = {
	name: 'epSearch',
	priority: 5,
	pattern: `RegExp:${searchRegExp}`,
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
