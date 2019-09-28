import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles.css';

const Nav = () => {
	return (
		<nav>
			<NavLink to='/'>
				Home
			</NavLink>
			<NavLink to='/post'>
				Post
			</NavLink>
			<NavLink to='/404-error'>
				Error
			</NavLink>
		</nav>
	);
};

export default Nav;
