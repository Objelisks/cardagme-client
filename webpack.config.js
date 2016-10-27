let webpack = require('webpack');
let path = require('path');
 
module.exports = {
    entry: {
        'commons': [
            'react',
            'react-dom',
            'react-redux'
        ],
        'app.bundle': './js/index.js'
    },
    output: {
        path: './static/bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: /(js|com)/,
            loader: 'babel?cacheDirectory'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        quiet: true
    }
};