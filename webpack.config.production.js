var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist')
var APP_DIR = path.resolve(__dirname, './')

var config = {
  entry: [
    APP_DIR + '/lib/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: '/dist.js',
    library: 'reactMultistepComponent',
    libraryTarget: 'umd'
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader : 'babel'
      }
    ]
  },
  plugins: [
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
