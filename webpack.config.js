var webpack = require('webpack');
var path = require('path');
var basepath = path.join(__dirname, 'src');
// config
var webpackConfig = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
    },
    output: {
        path: './dist',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            app: basepath + '/app',
            shared: basepath + '/app/shared',
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills'], minChunks: Infinity}),
    ],
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},
        ]
    }
};

// Webpack defaults
var defaultConfig = {
    devtool: 'cheap-module-eval-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    path.join(__dirname, 'node_modules', 'rxjs'),
                    path.join(__dirname, 'node_modules', '@angular2-material'),
                ]
            }
        ],
        noParse: [
            path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
            path.join(__dirname, 'node_modules', 'angular2', 'bundles'),
        ]
    },

    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);