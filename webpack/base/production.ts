
/* IMPORT */

import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
// import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';

/* CONFIG */

const config = {
  bail: true,
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract ({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract ({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new webpack['LoaderOptionsPlugin'] ({
      debug: false,
      minimize: true
    }),
    new webpack.DefinePlugin ({
      'module.hot': JSON.stringify ( false )
    }),
    new ExtractTextPlugin ({
      filename: 'template.css',
      disable: false,
      allChunks: true
    }),
    // new UglifyJSPlugin ({ //FIXME
    //   parallel: true,
    //   uglifyOptions: {
    //     ie8: false,
    //     ecma: 7,
    //     parse: {
    //       ecma: 7
    //     }
    //   }
    // })
  ]
};

/* EXPORT */

export default config;
