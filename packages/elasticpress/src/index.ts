import ElasticPress from '../types';
import { relatedPost } from './handlers';

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
			],
		},
	},
};

export default elasticpress;
