var webpack = require('webpack'),
    path = require('path');

var srcPath  = path.join(__dirname, '/public/javascripts/'),
    distPath = path.join(__dirname, '/public/javascripts/');

module.exports = {
    context: srcPath,
    entry: {
        faucet: './faucet.ts',
    },
    output: {
        path: distPath,
        filename: '[name].js',
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
        }]
    }
};
