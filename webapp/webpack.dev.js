const path = require('path');
const config = require('./webpack.config');
// const process = require('process');

config.entry.push('./app/test/test.js');
config.entry.push('webpack/hot/dev-server');


config.devServer = {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 8082
};


module.exports = config;