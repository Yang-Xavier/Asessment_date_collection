
const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: ['webpack/hot/dev-server','./app/main.js'],
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '//assets//',
        library: 'lib',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }) //must be this order

            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new htmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

}


