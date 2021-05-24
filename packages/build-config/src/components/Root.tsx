import { FC } from 'react';
import { Head, useConnect, connect } from 'frontity';
import { Packages } from '../../types';

const Root: FC = () => {
	const { state } = useConnect<Packages>();

	if (!state.tenupbuildconfig.hasStaticCSS) {
		return null;
	}

	const cssPath = `${state.tenupbuildconfig.publicPath}/css/index.css`;
	return (
		<Head>
			<link rel="stylesheet" href={cssPath} />
		</Head>
	);
};

export default connect(Root);
