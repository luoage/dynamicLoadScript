import fs from 'fs';
import path from 'path';
import Debug from 'debug';
import handlebars from 'handlebars';

var debug = Debug('shop');


let partials = {
	layout: 'layout',
	test: 'test'
};


function readPartials(partials) {
	var cache = {};
	var pts = Object.keys(partials);
	var read = function(temPath, options) {
		var file;
		var str;

		if (options.cache && pts.length) {
			return cache;
		}

		pts.forEach((value) => {
			file = path.resolve(temPath, partials[value]) + '.' + options.extension;

			str = fs.readFileSync(file, {encoding: 'utf8'});

			debug(`load partial ${file}`);

			cache[value] = str;
		});

		return cache;
	};

	return function(temPath, options, next) {
		let partials = read(temPath, options);

		handlebars.partials = {};

		Object.keys(partials).forEach((key) => {
			debug(`register patial ${key}`);
			handlebars.registerPartial(key, partials[key]);
		});

		if (next) {
			return next();
		}
	};
}

module.exports = readPartials(partials);
