import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from './Routes';
import Nav from './components/Nav';

import RootReducer from './action-reducer/RootReducer';
const Store = createStore(RootReducer);

const Client = () => {
	return (
		<Provider store={Store}>
			<Fragment>
				<Nav />
				<Switch>
					{Routes.map((r, i) => <Route key={i} {...r} />)}
				</Switch>
			</Fragment>
		</Provider>
	);
};

export default Client;
