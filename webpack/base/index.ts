
/* IMPORT */

import {CheckerPlugin} from 'awesome-typescript-loader';
import * as Chalk from 'chalk';
import merge from 'conf-merge';
import * as path from 'path';
import * as webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import SummaryPlugin from 'webpack-summary';

/* ENVIRONMENT */

const ENVIRONMENT = process.env.NODE_ENV || 'development',
      DEVELOPMENT = ENVIRONMENT !== 'production',
      HOT = !!process.env.HOT,
      ANALYZE = !!process.env.ANALYZE;

/* CONFIG */

const envConfig = require ( `./${ENVIRONMENT}` ).default;

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve ( 'src' ),
      'node_modules'
    ]
  },
  output: {
    path: path.resolve ( 'dist' ),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'awesome-typescript-loader'
    }, {
      test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[ext]'
        }
      }
    }, {
      test: /\.(svg|jpe?g|png|gif)(\?.*)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name].[ext]'
        }
      }
    }, {
      test: /\.html$/,
      use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }, {
          loader: 'extract-loader'
        }, {
          loader: 'html-loader',
          options: {
            minimize: !DEVELOPMENT,
            removeComments: !DEVELOPMENT,
            collapseWhitespace: !DEVELOPMENT
          }
        }]
    }]
  },
  plugins: [
    new CheckerPlugin (),
    new webpack['NoEmitOnErrorsPlugin'] (),
    new webpack.DefinePlugin ({
      ENVIRONMENT: JSON.stringify ( ENVIRONMENT ),
      DEVELOPMENT: JSON.stringify ( DEVELOPMENT ),
      PRODUCTION: JSON.stringify ( !DEVELOPMENT ),
      HOT: JSON.stringify ( HOT ),
      'process.env.NODE_ENV': JSON.stringify ( ENVIRONMENT )
    })
  ],
  node: {
    __filename: false,
    __dirname: false
  },
  stats: {}
};

if ( ANALYZE ) {

  config.plugins.push ( new BundleAnalyzerPlugin ({
    generateStatsFile: true,
    openAnalyzer: false,
    statsFilename: path.resolve ( 'dist/analyze.json' )
  }));

} else {

  config.plugins.push (
    new SummaryPlugin ({
      normal: Chalk.yellow ( '[{entry.name}] Bundled into "{entry.asset}" ({entry.size.MB}MB) in {time.s}s. {stats.warnings.length} warning(s).' ),
      watching: ''
    })
  );

  config.stats = {
    assets: false,
    chunks: false,
    hash: false,
    modules: false,
    performance: false,
    timings: false,
    version: false,
    warnings: false
  };

}

/* EXPORT */

export default merge ( {}, config, envConfig );
