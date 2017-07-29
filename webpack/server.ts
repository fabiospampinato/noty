
/* IMPORT */

import merge from 'conf-merge';
import * as nodeExternals from 'webpack-node-externals';
import baseConfig from './base';

/* SERVER */

const config = {
  target: 'node',
  externals: [nodeExternals ()],
  entry: {
    server: './src/server/index.ts'
  }
};

/* EXPORT */

export default merge ( {}, baseConfig, config );
