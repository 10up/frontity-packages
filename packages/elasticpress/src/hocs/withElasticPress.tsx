import React from 'react';
import { ElasticPressProvider } from '@10up/elasticpress-react';
import { connect, useConnect } from 'frontity';
import { Packages, WithElasticPressType } from '../../types';

const withElasticPress: WithElasticPressType = (Comp) => {
	const WrappedComponent = () => {
		const { state } = useConnect<Packages>();
		const { isSearch } = state.source.get(state.router.link);

		if (isSearch) {
			return (
				<ElasticPressProvider
					node={state.elasticpress.node}
					indexName={state.elasticpress.indexName}
					loadInitialData={state.elasticpress.loadInitialData || true}
				>
					<Comp />
				</ElasticPressProvider>
			);
		}

		return <Comp />;
	};

	return connect(WrappedComponent);
};

export default withElasticPress;
