
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        'vendor': ['angular','angular-animate','angular-aria','angular-messages','angular-material','angular-material-icons','@uirouter/angularjs','angular-jk-carousel'],
        'app': path.resolve(__dirname,'src/app.js')
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'scripts/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' } )
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html')
        }),

        new ExtractTextPlugin("styles/[name].css"),

        new HtmlWebpackPlugin({
            filename: 'carousel.html',
            template: 'src/assets/carousel.html'
        }),

        new CopyWebpackPlugin([
            { from: 'src/assets/img', to: 'img' }
        ])
    ]
};