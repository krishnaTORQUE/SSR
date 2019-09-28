import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from '../src/Routes';
import Client from '../src/Client';
import fs from 'fs';

module.exports = {
	/**
   * Route Status
   */
	routeStatus: async url => {
		let status = 200;
		let currentRoute = Routes.find(r => matchPath(url, r));
		/**
		 * Check Status Code
		 */
		if (currentRoute.status) {
			status = currentRoute.status;
		} else if (!currentRoute.component) {
			status = 404;
		}
		return status;
	},
	/**
   * Server Side Render Markup
   * and
   * Client Side Render Markup
   */
	renderType: async ({
		type,
		url,
		context,
		initData,
		appendHead,
		appendBody,
		prependBody
	}) => {
		return new Promise(solve => {
			const indexMin = `${__dirname}/../public/indexMin.html`;

			fs.readFile(indexMin, 'utf8', (err, data) => {
				switch (type) {
					/**
           * Server Side
           */
					case 'SSR':
						/**
             * Generate Markup
             */
						const markup = renderToString(
							<StaticRouter location={url} context={context || {}}>
								<Client />
							</StaticRouter>
						);
						/**
             * Replace Root with Markup
             */
						let htmlData = data.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
						/**
             * Initial Data
             */
						if (initData) {
							htmlData = htmlData.replace(
								'window.__initData__=""',
								`window.__initData__=${initData}`
							);
						}
						/**
						 * Meta Tags & Other Datas
             */
						const helmet = Helmet.renderStatic();

						let allTags = '';
						allTags += helmet.title.toString();
						allTags += helmet.meta.toString();
						allTags += helmet.link.toString();
						allTags += helmet.style.toString();
						/**
						 * Html Tag Attribute
						 */
						htmlData = htmlData.replace('<html>', `<html ${helmet.htmlAttributes.toString()}>`);
						/**
						 * Head Tag
						 */
						htmlData = htmlData.replace('</head>', `${allTags} ${appendHead || ''}</head>`);
						/**
						 * Body Tag
						 */
						htmlData = htmlData.replace('<body>', `<body ${helmet.bodyAttributes.toString()}>${prependBody || ''}`);
						htmlData = htmlData.replace('</body>', `${appendBody || ''}</body>`);

						solve(htmlData);
						break;

					/**
           * Client Side
           */
					case 'CSR':
						solve(data);
						break;

					default:
						solve(false);
				}
			});
		});
	}
};
