'use strict';

import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';
import path from 'path';
import Debug from 'debug';

import ub from './app/utility/base';
import hbsPartial from './app/handlebars/partials';
import router from './app/router';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const isDev = process.env.NODE_ENV === 'development';

var debug = Debug('shop');
var app = new Koa();
var temPath = path.resolve(__dirname, 'template');
var temOptions = {
	map: {
		hbs: 'handlebars'
	},
	extension: 'hbs',
	cache: !isDev
};


// TODO
app.on('error', (err) => {
	console.log(err, '----------------');
});


app.use(async (ctx, next) => {
	const start = new Date();

	try{
		await next();
	} catch(e) {
		ctx.status = e.statusCode || e.status || 500;
		ctx.body = e.mssage;
	}

	const ms = new Date() - start;

	console.log(`${ctx.method} ${ctx.url} ${ctx.res.statusCode} ${ms}ms`);
});


app.use(session({
	key: 'SESSIONID'
}));


app.use(convert(csrf()));


app.use(views(temPath, temOptions));


app.use(async (ctx, next) => {
	debug('rewrite ctx render fn');

	((render) => {
		ctx.render = function() {
			return render.apply(this, arguments)
				.catch((e) => {
					if (isDev) {
						ctx.body = e.stack;
						return;
					}
					console.log(e.stack); // TODO kill progress
				});
		};
	})(ctx.render);

	await next();
});


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
