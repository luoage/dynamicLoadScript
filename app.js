import Koa from 'koa';
import session from 'koa-session2';
import csrf from 'koa-csrf';
import convert from 'koa-convert';
import views from 'koa-views';
import fs from 'fs';
import path from 'path';

// TODO 错误捕获

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


app.use(views(path.resolve(__dirname, 'template'), {
	map: {html: 'handlebars'},
	extension: 'html'
}));


app.use(async (ctx, next) => {
	await require('./app/router').routes()(ctx, next);
});


app.listen(3000, function() {
	console.log('start at port 3000 !');
});


// TODO watch base directory
hotLoad( ['./app/', './app/http/', './app/http/user/', './app/http/customer/'], (eventType, filePath) => {
	clearCache('./app/router.js');
	console.log(eventType, ' ', filePath);
});


// TODO await/async
function hotLoad(dirs, cb){
	dirs = Array.isArray(dirs) ? dirs : [dirs];

	var prevFile;
	var timeout;

	dirs.forEach((dir) => {
		fs.watch(dir, {recursive:false}, (eventType, filename) => {
			var filePath = path.resolve(__dirname, dir, filename);

			if (prevFile === filePath && timeout){
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				clearCache(filePath);
				cb && cb(eventType, filePath);
			}, 50);

			prevFile = filePath;
		});
	});
}


function clearCache(path){
	var filePath = require.resolve(path);
	var module = require.cache[filePath];

	if (!module) return;

	if (module.parent) {
		module.parent.children.splice(module.parent.children.indexOf(module), 1);
	}

	require.cache[filePath] = null;
}
