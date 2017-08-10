
/* IMPORT */

import * as webpack from 'webpack';

/* CONFIG */

const config = {
  devtool: 'inline-source-map',
  output: {
    pathinfo: true
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      use: 'source-map-loader'
    }, {
      enforce: 'pre',
      test: /\.tsx?$/,
      use: 'source-map-loader'
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new webpack['LoaderOptionsPlugin'] ({
      debug: true,
      minimize: false
    })
  ]
};

/* EXPORT */

export default config;
