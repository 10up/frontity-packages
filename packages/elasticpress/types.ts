import { Package } from 'frontity/types';
import WpSource from '@frontity/wp-source/types';

interface ElasticPress extends Package {
	name: '@10up/frontity-elasticpress';
	libraries: {
		source: {
			handlers: WpSource['libraries']['source']['handlers'];
		};
	};
	state?: {
		elasticpress: {
			endpoint: string;
		};
	};
}

export default ElasticPress;
