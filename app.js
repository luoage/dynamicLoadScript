'use strict';

import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import Router from 'koa-router';

var app = new Koa();
var router = Router();

// 注意：middleware是有顺序的

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

/*
app.use(async (ctx) => {
	ctx.session.user = '2222';

	// console.log(ctx.csrf, 'csrf');
	// console.log(ctx.session, 'session');

	// ctx.body = 'hello koa';
});
*/

router.get('/list', (ctx) => {
	ctx.body = '2222';
});

router.get('/', (ctx) => {
	ctx.body = '2222----------index';
});

router.use('/user', router.routes());


app.use(router.routes());

app.listen(3000, function() {
	console.log('start at 3000 port !');
});
