var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './examples/dist')
var APP_DIR = path.resolve(__dirname, './')

var config = {
  entry: [
    APP_DIR + '/examples/example.js'
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
    new ExtractTextPlugin( "bundle.css" )
  ],
  watch: true,
  devtool: 'source-map'
};

module.exports = config;
