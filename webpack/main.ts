
/* IMPORT */

import merge from 'conf-merge';
import baseConfig from './base';
import * as nodeExternals from 'webpack-node-externals';

/* MAIN */

const config = {
  target: 'electron-main',
  externals: [nodeExternals ()],
  entry: {
    main: './src/main/index.ts'
  }
};

/* EXPORT */

export default merge ( {}, baseConfig, config );
