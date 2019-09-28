import Loadable from 'react-loadable';
/**
 * All Routes
 */
const Routes = [
	{
		exact: true,
		path: '/',
		component: Loadable({
			loader: () => import('./components/Home'),
			loading: () => null
		})
	},
	{
		exact: true,
		path: '/post',
		component: Loadable({
			loader: () => import('./components/Post'),
			loading: () => null
		})
	},
	{
		path: '/forbidden',
		component: Loadable({
			loader: () => import('./components/Forbidden'),
			loading: () => null
		}),
		status: 403
	},
	{
		path: '*',
		component: Loadable({
			loader: () => import('./components/NotFound'),
			loading: () => null
		}),
		status: 404
	}
];

export default Routes;
