import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';
import fs from 'fs';
import path from 'path';


var routerUser = require('./app/router');

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

app.use(() => {
	routerUser.routes().apply(routerUser, arguments);
});


app.listen(3000, function() {
	console.log('start at port 3000 !');
});

fs.watch('./app/http/user', (eventType, filename) => {
	var filePath = path.resolve(__dirname, './app/http/user', filename);

	clearCache(filePath);
});

setInterval(() => {
	clearCache('./app/router');

	try {
		routerUser = require('./app/router');
	} catch(e) {
		console.error('route update false');
	}
}, 1000);

function clearCache(module){
	var filePath = require.resolve(module)


	require.cache[filePath] = null;
}
