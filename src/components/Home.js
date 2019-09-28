import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

class Home extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Fragment>
				<Helmet
					htmlAttributes={{ lang: 'en' }}>

					<title>Home - {this.props.title}</title>
				</Helmet>

				<div className='container'>
					<h1>Home Page</h1>
				</div>
			</Fragment>
		);
	}
}

const stateProps = (state) => {
	return state;
};

export default connect(stateProps)(Home);
