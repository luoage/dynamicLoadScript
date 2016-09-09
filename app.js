import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';


import routerUser from './app/router';

var app = new Koa();


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


app.use(views(`${__dirname}/template`, {
	map: {html: 'handlebars'},
	extension: 'html'
}));


app.use(routerUser.routes());


app.listen(3000, function() {
	console.log('start at port 3000 !');
});
