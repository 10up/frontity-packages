import { Handler } from '@frontity/wp-source/types';

/**
 * A {@link Handler} for fetching ElasticPress related posts.
 */
const relatedPostHandler: Handler = async ({ route, params, state, libraries }) => {
	const { api, populate } = libraries.source;

	const postId = parseInt(params.postId, 10);

	/**
	 * Utility that fetches and populate related posts from elasticpress
	 *
	 * @param params - Object with the following params:
	 * @param params.postId - The post id.
	 * @param params.number - Number of related posts.
	 *
	 */
	const fetchRelatedPosts = async ({ postId }) => {
		const response = await api.get({
			endpoint: `posts/${postId}/related`,
			params,
		});

		const populated = await populate({ response, state });

		return { response, populated };
	};

	// eslint-disable-next-line
	const { response, populated } = await fetchRelatedPosts({ postId });

	Object.assign(state.source.data[route], {
		postId,
	});
};

export default relatedPostHandler;
