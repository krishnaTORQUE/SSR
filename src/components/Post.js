import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const Post = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Post</title>
			</Helmet>
			<div className='container'>
				<h1>Post Page</h1>
			</div>
		</Fragment>
	);
};

export default Post;
