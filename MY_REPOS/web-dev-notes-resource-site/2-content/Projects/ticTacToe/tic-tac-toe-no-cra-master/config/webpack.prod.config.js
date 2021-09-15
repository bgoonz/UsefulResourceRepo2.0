const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// Plugins
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
    return merge([
        {
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        default: false,
                        vendors: false,
                    },
                },
                runtimeChunk: {
                    name: 'manifest',
                },
                minimizer: [new UglifyJSPlugin()],
            },
            plugins: [
                new webpack.HashedModuleIdsPlugin(),
                new OptimizeCssAssetsPlugin(),
                new Visualizer({ filename: './statistics.html' })
            ]
        }
    ])  
}

module.exports = env => {
    return merge(baseConfig(env), prodConfiguration(env));
}