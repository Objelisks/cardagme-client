 let webpack = require('webpack');
 
 module.exports = {
     entry: './js/index.js',
     output: {
        path: './static/bin',
        filename: 'app.bundle.js'
     },
     module: {
        loaders: [{
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
     },
     plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
     ],
     externals: {
         "react": "React",
         "react-dom": "ReactDOM"
     }
 };