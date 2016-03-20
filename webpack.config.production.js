var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist')
var APP_DIR = path.resolve(__dirname, './')

var config = {
  entry: [
    APP_DIR + '/lib/index.js',
    APP_DIR + '/lib/styles.scss',
  ],
  output: {
    path: BUILD_DIR,
    filename: '/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin( "bundle.css" ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  watch: false
};

module.exports = config;
