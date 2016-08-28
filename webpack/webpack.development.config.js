"use strict";
// development

var webpack = require('/var/www/webpack'); // TODO 使用全局webpack

var path = require('path');
var outpath = path.join(__dirname, '../dist');

module.exports = {

	entry : {
		main : [ './src/js/index' ]
	},

	output : {
		path : outpath,
		filename : '[name].js',
		chunkFilename : '[chunkhash].js',
		publicPath : 'http://192.168.10.150:8080/asserts/'
	},

	plugins : [
		new webpack.optimize.CommonsChunkPlugin({
			name : 'manifest'
		}),
		//new webpack.HotModuleReplacementPlugin()
	],

	devServer : {
		contentBase : './dist',
		host : '0.0.0.0',
		port : 8080,
		inline:true,
		//hot : true,
		publicPath : '/asserts/',
		progress : true
	}
};
