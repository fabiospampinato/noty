
/* IMPORT */

import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/renderer';

/* VARIABLES */

const app = express (),
      compiler = webpack ( config );

/* SERVER */

app.use ( webpackDevMiddleware ( compiler, {
  publicPath: config['output'].publicPath,
  stats: config['stats']
}));

app.use ( webpackHotMiddleware ( compiler ) );

app.listen ( 3000, 'localhost', err => {
  if ( err ) return console.error ( err );
  console.log ( 'Listening at http://localhost:3000' );
});
