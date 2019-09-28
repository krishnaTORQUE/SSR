import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import Client from './Client';

render(
	<BrowserRouter>
		<Client />
	</BrowserRouter>,
	document.getElementById('root')
);
