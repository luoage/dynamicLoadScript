'use strict';

import fs from 'fs';
import glob from 'glob';
import path from 'path';
import Debug from 'debug';

var debug = Debug('shop');

var base = {

	hotLoad: function(dirs, cb) {
		dirs = Array.isArray(dirs) ? dirs : [dirs];

		var prevFile;
		var timeout;

		dirs.forEach((dir) => {
			fs.watch(dir, {recursive: false}, (eventType, filename) => {
				var filePath = path.resolve(dir, filename);

				if (prevFile === filePath) {
					clearTimeout(timeout);
				}

				timeout = setTimeout(() => {
					this.clearCache(filePath);
					cb && cb(eventType, filePath);
				}, 100);

				prevFile = filePath;
			});
		});
	},

	clearCache: function(filePath) {
		var module = require.cache[filePath];

		if (!module) {
			return;
		}

		if (module.parent) {
			module.parent.children.splice(module.parent.children.indexOf(module), 1);
		}

		require.cache[filePath] = null;
	},

	readDir: function(dirs, options) {
		options = options || {};

		return new Promise((resolve, reject) => {
			glob(dirs, options, (err, files) => {
				if (err) {
					return reject(err);
				}

				resolve(files);
			});
		});
	},

	watch: function(root) {
		var files = glob.sync('./app/**/', {root: './'});

		this.hotLoad(files, (eventType, filePath) => {
			const route = path.resolve(root, './app/router.js');

			this.clearCache(route);
			debug(`${eventType} ${filePath}`);
		});
	}
};

module.exports = base;
