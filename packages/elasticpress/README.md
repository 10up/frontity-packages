# @10up/frontity-elasticpress

> This package enhances your frontity theme by supercharing the search experience with ElasticPress.

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level)

## Requirements

* Elasticsearch per [ElasticPress requirements](https://github.com/10up/ElasticPress#requirements).
* WordPress website running [ElasticPress](https://elasticpress.io).

## Installation

To install this package you will need an existing frontity project. Check out the [frontity docs](https://docs.frontity.org/getting-started/quick-start-guide) for instructions.

Install this package:

```
npm install @10up/frontity-elasticpress --save
```

Then in your `frontitiy.settings.[js|ts]` add the configuration for ElasticPress in the `packages` section.

```js
		{
			name: '@10up/frontity-elasticpress',
			state: {
				elasticpress: {
					node: 'http://elasticpress.test/__elasticsearch',
					indexName: 'elasticpresstest-post-1',
					loadInitialData: true,
				},
			},
		},
```

That's all you need.

## How it works

This packages replaces the default search handler with a custom one that runs search queries directly in ElasticSearch index directly instead of WordPress.

In addition to better search results this also allow you to have real-time search results as you type. See a example [here](https://github.com/10up/frontity-packages/blob/develop/packages/twentypress/src/components/search/search-modal.js#L106).

## Disclaimer

You need to ensure your ElasticSearch index is not fully exposed to the public. You most likely want to add some layer around your ElasticSearch index to lock down your index to avoid unwanted queries or requests.




## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10updotcom-wpengine.s3.amazonaws.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="Work with us at 10up"></a>
