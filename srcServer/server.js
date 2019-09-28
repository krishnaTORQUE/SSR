import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
const app = express();
import { preloadAll } from 'react-loadable';
import { routeStatus, renderType } from './renderHandler';

/**
 * MiddleWares
 */
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Set Listen PORT
 */
const PORT = process.env.PORT || 3100;
/**
 * Server Listening
 */
preloadAll().then(() => {
	app.listen(PORT, () => console.log(`Listen Port: ${PORT}`));
});
/**
 * Static / Assets Path
 */
app.use(express.static(`${__dirname}/../build`));
/**
 * GET Routes
 */
app.get('*', async (req, res) => {

	Promise.all([
		routeStatus(req.url),
		renderType({ type: 'SSR', url: req.url, initData: 'Hello' }),
	])
		.then(([status, html]) => {
			res.status(status);
			res.send(html);
		});
});
