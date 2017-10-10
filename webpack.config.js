var webpack = require('webpack'),
    path = require('path');

require('dotenv').config({ path: '.env' });

var srcPath  = path.join(__dirname, '/public/javascripts/'),
    distPath = path.join(__dirname, '/public/javascripts/');

const RECEIVER = process.env.RECEIVER;
if (!RECEIVER) throw new Error('Please, set receiver address to RECEIVER env variable')

const GATEWAY_URL = process.env.GATEWAY_URL;
if (!GATEWAY_URL) throw new Error('Please, set gateway url to GATEWAY_URL env variable')

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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "window.RECEIVER": JSON.stringify(RECEIVER),
            "window.GATEWAY_URL": JSON.stringify(GATEWAY_URL)
        }),
    ],
    module: {
        loaders: [{
            test: /\.ts?$/,
            loader: 'ts-loader'
        }, 
        { test: /\.handlebars$/, loader: "handlebars-loader" }]
    }
};
