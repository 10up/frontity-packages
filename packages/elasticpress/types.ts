import { Package } from 'frontity/types';

interface ElasticPress extends Package {
	name: '@10up/frontity-elasticpress';
	libraries: {
		elasticpress: {};
	};
}

export default ElasticPress;
