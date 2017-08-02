
/* IMPORT */

import {CheckerPlugin} from 'awesome-typescript-loader';
import * as Chalk from 'chalk';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import SummaryPlugin from 'webpack-summary';

/* ENVIRONMENT */

const ENVIRONMENT = process.env.NODE_ENV || 'development',
      DEVELOPMENT = ENVIRONMENT !== 'production',
      ANALYZE = !!process.env.ANALYZE;

/* BASE */

const config = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve ( 'src' ),
      'node_modules'
    ]
  },
  output: {
    path: '/Users/fabio/Dropbox/Projects/noty/dist', //FIXME: HACK, path.join ( __dirname, '../../dist' ),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    pathinfo: true
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.tsx?$/,
      use: 'source-map-loader'
    }, {
      test: /\.tsx?$/,
      use: 'awesome-typescript-loader'
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[hash].[ext]'
        }
      }
    }, {
      test: /\.(svg|jpe?g|png|gif)(\?.*)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[hash].[ext]'
        }
      }
    }]
  },
  plugins: [
    new CheckerPlugin (),
    new webpack['NoEmitOnErrorsPlugin'] (),
    new (CopyWebpackPlugin as any) ([{
      from: path.resolve ( 'assets' ),
      to: path.resolve ( 'dist/assets' )
    }]),
    new webpack.DefinePlugin ({
      ENVIRONMENT: JSON.stringify ( ENVIRONMENT ),
      DEVELOPMENT: JSON.stringify ( DEVELOPMENT ),
      PRODUCTION: JSON.stringify ( !DEVELOPMENT ),
      'process.env.NODE_ENV': JSON.stringify ( ENVIRONMENT )
    }),
    new SummaryPlugin ({
      normal: Chalk.yellow ( '[{entry.name}] Bundled into "{entry.asset}" ({entry.size.MB}MB) in {time.s}s. {stats.warnings.length} warning(s).' ),
      watching: ''
    }),
    new webpack['LoaderOptionsPlugin'] ({
      debug: true,
      minimize: false
    })
  ],
  node: {
    __filename: true,
    __dirname: true
  },
  stats: {
    assets: false,
    chunks: false,
    hash: false,
    modules: false,
    performance: false,
    timings: false,
    version: false,
    warnings: false
  }
};

if ( ANALYZE ) {

  config.plugins.push ( new BundleAnalyzerPlugin ({
    generateStatsFile: true,
    openAnalyzer: false,
    statsFilename: path.resolve ( 'dist/analyze.json' )
  }));

}

/* EXPORT */

export default config;
