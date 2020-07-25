import { Package } from 'frontity/types';
import WpSource from '@frontity/wp-source/types';

interface ElasticPress extends Package {
	name: '@tenup/frontity-elasticpress';
	libraries: {
		source: {
			handlers: WpSource['libraries']['source']['handlers'];
		};
	};
}

export default ElasticPress;
