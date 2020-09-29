import React from 'react';
import { ElasticPressProvider } from '@10up/elasticpress-react';
import { connect, useConnect } from 'frontity';

const withElasticPress = (Comp) => {
	const WrappedComponent = () => {
		const { state } = useConnect();
		const data = state.source.get(state.router.link);
		console.log(data);

		return (
			<ElasticPressProvider
				node="http://elasticpress.test/__elasticsearch"
				indexName="elasticpresstest-post-1"
			>
				<Comp />
			</ElasticPressProvider>
		);
	};

	return connect(WrappedComponent);
};

export default withElasticPress;
