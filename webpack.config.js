var webpack = require('webpack'),
    path = require('path');

var srcPath  = path.join(__dirname, '/public/javascripts/'),
    distPath = path.join(__dirname, '/public/javascripts/');

module.exports = {
    context: srcPath,
    entry: {
        faucet: './faucet.js',
        paid: './paid.js',
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: ["node_modules"],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.ts?$/,
            loader: 'ts-loader'
        }, 
        { test: /\.handlebars$/, loader: "handlebars-loader" }]
    }
};
