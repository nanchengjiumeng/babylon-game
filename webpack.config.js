var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index",
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html'
    })]
};