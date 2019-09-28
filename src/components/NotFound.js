import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Error</title>
			</Helmet>
			<div className='container'>
				<h1>
					Error <br /> Page Not Found
				</h1>
			</div>
		</Fragment>
	);
};

export default NotFound;
