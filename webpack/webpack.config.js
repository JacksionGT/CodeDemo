// ./webpack.config.js
/** @type {import('webpack').Configuration} */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const { ESBuildPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        index: './index.js'
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 30000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new ESBuildPlugin(),
        new HtmlWebpackPlugin({ template: './index.html' }),
    ],
    devtool: 'source-map',
    target: 'web',
    devServer: {
        port: 7233
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:6].js',
        chunkFilename: '[name].[contenthash:8].js',
    }
};