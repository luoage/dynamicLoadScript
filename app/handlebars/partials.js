import fs from 'fs';
import path from 'path';
import Debug from 'debug';

var debug = Debug('shop');



let partials = {
	layout: 'layout',
	test: 'test'
};

function readPartials(partials) {
	var cache = {};
	var pts = Object.keys(partials);

	return function(temPath, options) {
		return new Promise((resolve, reject) => {

			if (options.cache && Object.keys(cache).length) {
				return resolve(cache);
			}

			var next = function(index) {
				if(index === pts.length){
					return resolve(cache);
				}

				var file = path.resolve(temPath, partials[pts[index]])+'.hbs';

				fs.readFile(file, {encoding: 'utf8', flag: 'r'}, function(err, str) {
					if(err) {
						return reject(err);
					}

					debug('load partial ${file}');

					cache[pts[index]] = str;

					next(++index);
				});
			};

			return next(0);
		});
	};
}

module.exports = readPartials(partials);
