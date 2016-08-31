'use strict';

// development

let webpack = require('webpack');
let path = require('path');
let outpath = path.resolve('dist');
let extractTextPlugin = require('extract-text-webpack-plugin');


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
		loaders : [
			{ 
				test : /\.less$/,
				loader: extractTextPlugin.extract({
					loader: 'css!less'
				})
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new extractTextPlugin({
			filename: '[name].a.css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	],

	resolve : {
		root: path.resolve('src')
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
