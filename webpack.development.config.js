'use strict';

let webpack = require('webpack');
let path = require('path');
let outpath = path.resolve('./dist/js');


module.exports = {

	entry: {
		main: './src/js/index'
	},

	output: {
		publicPath: '/js/',
		path: outpath,
		filename: '[name].js',
		chunkFilename: '[chunkhash].js'
	},

	module: {
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new webpack.HotModuleReplacementPlugin()
	]

};
