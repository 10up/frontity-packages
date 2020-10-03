import { Handler } from '@frontity/wp-source/types';
import { Packages } from '../../types';

/**
 * A {@link Handler} for fetching ElasticPress related posts.
 */
const relatedPostHandler: Handler<Packages> = async ({
	route,
	params,
	state,
	libraries,
	force,
}) => {
	const { api, populate } = libraries.source;

	const postId = parseInt(params.postId, 10);
	delete params.postId;

	const response = await api.get({
		endpoint: `posts/${postId}/related`,
		params,
	});

	const populated = await populate({ response, state, force });

	Object.assign(state.source.data[route], {
		items: populated,
	});
};

export default relatedPostHandler;
