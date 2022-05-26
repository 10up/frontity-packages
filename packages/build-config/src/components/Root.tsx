import { FC } from 'react';
import { Head, useConnect, connect } from 'frontity';
import { Packages } from '../../types';

const Root: FC = () => {
	const { state } = useConnect<Packages>();

	if (!state.TenUpBuildConfig.hasStaticCSS) {
		return null;
	}

	const cssPath = `${state.frontity.options.publicPath ?? state.TenUpBuildConfig.publicPath}/${
		state.TenUpBuildConfig.cssfilename
	}`;

	return (
		<Head>
			<link rel="stylesheet" href={cssPath} />
		</Head>
	);
};

export default connect(Root);
