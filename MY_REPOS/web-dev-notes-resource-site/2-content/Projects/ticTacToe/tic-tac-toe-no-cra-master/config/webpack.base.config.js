const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'react-dom'
]

module.exports = env => {
    
    const {PLATFORM, VERSION } = env;
    return merge([
        {
            entry: {
                vendor: VENDOR_LIBS,
                bundle: './src/index.js'
            },
            output: {
                filename: PLATFORM === 'production' ? 'scripts/[name]-[chunkhash:8].js' : 'scripts/[name].js',
                path: path.resolve(__dirname, '../dist'),
            },
            module: {
                rules: [
                    {
                        test: /\.js?/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                    {
                        test: /\.(scss|sass|css)$/,
                        exclude: /node_modules/,
                        loaders: [
                            MiniCssExtractPlugin.loader,
                            {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[local]___[hash:base64:5]'
                            },
                        },
                            'postcss-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[path][name]-[hash:8].[ext]'
                            },
                        }],
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'src/index.html',
                    favicon: 'src/favicon.ico',
                    styles: 'src/styles.css',
                    inject: true
                }),
                new webpack.NamedModulesPlugin(),
                new MiniCssExtractPlugin({
                    filename: PLATFORM === 'production' ? 'styles/[name]-[hash].css' : '[name].css',
                }),
                new CopyWebpackPlugin([ {from: 'src/static'}]),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                }),
            ]
        },
    ])
}