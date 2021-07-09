const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		app: ['./src/app']
	},
	module: {
		loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
		}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
		}]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './public'),
		publicPath: '/public'
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	],
	// postcss: [
	//     autoprefixer({
	//         browsers: ['last 2 versions']
	//     })
	// ],
	postcss: (webpack) => {
		return [
			require("postcss-import")({ addDependencyTo: webpack }),
			require("postcss-url")(),
			require("postcss-cssnext")(), // postcss-cssnext !
		]
	},
	resolve: {
		extensions: ['', '.js', '.css'],
		root: [path.join(__dirname, './')]
	}
};