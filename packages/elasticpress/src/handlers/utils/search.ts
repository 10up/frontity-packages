import { AuthorEntity } from '@frontity/source/types';
import { EPAuthor } from '../../../types';

/**
 * Normalizes an author coming from ElasticPress into Frontity schema.
 *
 * @param epAuthor
 *
 * @returns
 */
export const normalizeAuthor = (epAuthor: EPAuthor): AuthorEntity => {
	// TODO: update this
	const link = epAuthor.link || `http://elasticpress.test/author/${epAuthor.login}`;
	return {
		id: epAuthor.id,
		slug: epAuthor.login,
		link,
		description: epAuthor.description || '',
		name: epAuthor.display_name,
		url: link,
		avatar_urls: epAuthor.avatar_urls || {},
	};
};

/**
 * Builds a fake fetch response object as frontity populate method expects
 *
 * @param normalizedResults
 *
 * @returns {Response}
 */
export const buildResponseForPopulate = (normalizedResults) => {
	return {
		json() {
			return new Promise((resolve) => {
				resolve(normalizedResults);
			});
		},
	} as Response;
};

const normalizedKeyMapping = {
	permalink: 'link',
	name: 'slug',
};

const specialRenderedFields = ['title', 'content', 'excerpt'];
const embededFields = ['author', 'terms'];

const taxonomiesMapping = {
	category: 'categories',
	post_tag: 'tags',
};

export const normalizeForFrontity = (results) => {
	return results.map((result) => {
		const keys = Object.keys(result);
		const normalizedResult = {
			_embedded: {
				author: [],
				'wp:term': [],
			},
		};

		keys.forEach((key) => {
			// skil post_content as we'll use post_content_filtered
			if (key === 'post_content') {
				return;
			}

			// get rid of post_ prefixes and _filtered suffixes
			const normalizedKey = key.replace('post_', '').replace('_filtered', '');
			const finalNormalizedKey = normalizedKeyMapping[normalizedKey] || normalizedKey;

			if (specialRenderedFields.includes(finalNormalizedKey)) {
				normalizedResult[finalNormalizedKey] = { rendered: result[key], protected: false };
			} else if (!embededFields.includes(finalNormalizedKey)) {
				normalizedResult[finalNormalizedKey] = result[key];
			}

			if (finalNormalizedKey === 'author') {
				normalizedResult[finalNormalizedKey] = result[key].id;
				normalizedResult._embedded.author.push(normalizeAuthor(result[key]));
			}

			if (finalNormalizedKey === 'terms') {
				const taxonomyTerms = result[key];

				const taxonomies = Object.keys(taxonomyTerms);

				taxonomies.forEach((taxonomy) => {
					const terms = taxonomyTerms[taxonomy];
					const termsForTaxonomy = terms.map((epTerm) => ({
						id: epTerm.term_id,
						taxonomy,
						name: epTerm.name,
						slug: epTerm.slug,
						link:
							epTerm.link ||
							`http://elasticpress.test/${taxonomy.replace('post_', '')}/${
								epTerm.slug
							}`,
					}));

					normalizedResult._embedded['wp:term'].push(termsForTaxonomy);
					normalizedResult[
						taxonomiesMapping[taxonomy] || taxonomy
					] = termsForTaxonomy.map((term) => term.id);
				});
			}
		});

		return normalizedResult;
	});
};
