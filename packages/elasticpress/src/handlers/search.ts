import { Handler } from '@frontity/wp-source/types';
import { PostTypeArchiveWithSearchData } from '@frontity/source/types/data';
import { Packages } from '../../types';
import { buildResponseForPopulate, normalizeForFrontity } from './utils/search';

/**
 * A {@link Handler} for running search through elasticsearch
 *
 * @param handlerParams
 */
const searchHandler: Handler<Packages> = async ({ link, state, force, libraries }) => {
	const { params } = state.source;
	const perPage = params.per_page || 10;
	const { parse, populate } = libraries.source;

	const { buildQuery, runEPQuery, searchQuery, getESEndpoint } = libraries.elasticpress;

	const { page, query, route } = parse(link);

	const { results, totalResults } = await runEPQuery(
		query.s,
		buildQuery(searchQuery, {
			searchTerm: query.s,
			offset: (page - 1) * perPage,
			perPage,
		}),
		getESEndpoint('search', state.elasticpress),
		(hit) => {
			return hit._source;
		},
	);

	const response = buildResponseForPopulate(normalizeForFrontity(results, state));

	const items = await populate({
		response,
		state,
		force,
	});

	const totalPages = Math.ceil(totalResults / perPage);

	const currentPageData = state.source.data[link];

	const getPageLink = (page: number) =>
		libraries.source.stringify({
			route,
			query,
			page,
		});

	const hasNewerPosts = page < totalPages;
	const hasOlderPosts = page > 1;

	const newPageData: PostTypeArchiveWithSearchData = {
		type: 'post',
		items,
		total: totalResults,
		totalPages,
		isArchive: true,
		isPostTypeArchive: true,
		isFetching: false,
		isReady: true,
		isSearch: true,
		searchQuery: query.s,
		// @ts-ignore
		isPostArchive: true,
		// Add next and previous if they exist.
		...(hasOlderPosts && { previous: getPageLink(page - 1) }),
		...(hasNewerPosts && { next: getPageLink(page + 1) }),
	};

	Object.assign(currentPageData, newPageData);
};

export default searchHandler;
