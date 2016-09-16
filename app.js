'use strict';

import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';
import path from 'path';
import Debug from 'debug';
import handlebars from 'handlebars';

import ub from './app/utility/base';
import hbsPartial from './app/handlebars/partials';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// TODO catch errors


const isDev = process.env.NODE_ENV === 'development'
var app = new Koa();
var debug = Debug('shop');
var temPath = path.resolve(__dirname, 'template');
var temOptions = {
	map: {
		hbs: 'handlebars'
	},
	extension: 'hbs',
	cache: !isDev
};


app.use(async (ctx, next) => {
	const start = new Date();

	await next();

	const ms = new Date() - start;

	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


isDev && app.use(convert(require('koa-static')('./dist')));


app.use(session({
	key: 'SESSIONID'
}));


app.use(convert(csrf()));


app.use(views(temPath, temOptions));


// add handlebars partials, it must be before routers
isDev ?  app.use(async (ctx, next) => {
	handlebars.partials = {};

	var partials = await require('./app/handlebars/partials')(temPath, temOptions);

	Object.keys(partials).forEach((key) => {
		debug(`register patial ${key}`);
		handlebars.registerPartial(key, partials[key]);
	});

	await next();
}) : hbsPartial(temPath,  temOptions).then((partials) => {
	Object.keys(partials).forEach((key) => {
		debug(`register patial ${key}`);
		handlebars.registerPartial(key, partials[key]);
	});
});


app.use(async (ctx, next) => {
	await require('./app/router').routes()(ctx, next);
});


app.listen(3000, () => {
	console.log('start at port 3000 !');
});


isDev && ub.readDir('./app/**/', {root: './'})
	.then((files) => {
		ub.hotLoad(files, (eventType, filePath) => {
			const route = path.resolve(__dirname, './app/router.js');

			ub.clearCache(route);
			console.log(eventType, ' ', filePath);
		});
	});


isDev && app.use(require('koa-webpack-middleware').devMiddleware(
	require('webpack')(require('./webpack.development.config')),
	{
		publicPath: '/js/',
		quiet: true
	}
));
