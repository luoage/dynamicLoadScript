'use strict';

import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';
import path from 'path';
import Debug from 'debug';
import glob from 'glob';

import ub from './app/utility/base';
import hbsPartial from './app/handlebars/partials';
import router from './app/router';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// TODO catch errors


const isDev = process.env.NODE_ENV === 'development';
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


app.use(session({
	key: 'SESSIONID'
}));


app.use(convert(csrf()));


app.use(views(temPath, temOptions));


if (isDev) {
	// static files
	app.use(convert(require('koa-static')('./dist')));

	// add handlebars partials, it must be before router
	app.use(async (ctx, next) => require('./app/handlebars/partials')(temPath, temOptions, next));

	// watch file changed
	ub.watch(__dirname);

	// webpack javascript
	app.use(require('koa-webpack-middleware').devMiddleware(
		require('webpack')(require('./webpack.development.config')),
		{
			publicPath: '/js/',
			quiet: true
		}
	));

	// router
	app.use(async (ctx, next) => require('./app/router').routes()(ctx, next));
} else {
	hbsPartial(temPath, temOptions);
	app.use(router.routes());
}


app.listen(3000, () => {
	console.log('start at port 3000 !');
});
