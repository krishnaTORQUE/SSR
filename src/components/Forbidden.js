import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Forbidden</title>
			</Helmet>
			<div className='container'>
				<h1>
					Forbidden <br /> You are not authorize
				</h1>
			</div>
		</Fragment>
	);
};

export default NotFound;
