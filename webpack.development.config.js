'use strict';


let webpack = require('webpack');
let path = require('path');
let outpath = path.resolve('dist');


module.exports = {

	entry: {
		main: './src/js/index'
	},

	output: {
		publicPath: '/asserts/',
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
	],

	resolve : {
	},

	devServer: {
		progress: true,
		contentBase: './template/',
		host: '0.0.0.0',
		port: 8080,
		inline: true,
		hot: true,
		publicPath: '/asserts/'
	}
};
