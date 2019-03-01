const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
// const process = require('process');

config.entry.push('./app/test/test.js');
config.entry.push('webpack/hot/dev-server');
config.output.publicPath = '/';

config.devServer = {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 8082,
    hot: true,
    historyApiFallback: true
};

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;