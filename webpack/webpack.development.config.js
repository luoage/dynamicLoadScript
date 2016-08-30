"use strict";
// development

var webpack = require('webpack'); // TODO 使用全局webpack

var path = require('path');
var outpath = path.join(__dirname, '../dist');

module.exports = {

	entry : {
		main : [ './src/js/index' ]
	},

	output : {
		publicPath : '/asserts/', // 发布路径
		path : outpath,
		filename : '[name].js',
		chunkFilename : '[chunkhash].js',
	},

	plugins : [
		new webpack.optimize.CommonsChunkPlugin({
			name : 'manifest'
		}),
		new webpack.HotModuleReplacementPlugin() // 启用热加载模式
	],

	devServer : {
		progress : true,
		contentBase : './template/',
		host : '0.0.0.0',
		port : 8080,
		inline:true,
		hot : true,
		publicPath : '/asserts/',
	}
};
