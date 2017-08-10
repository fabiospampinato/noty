
/* IMPORT */

import merge from 'conf-merge';
import * as nodeExternals from 'webpack-node-externals';
import baseConfig from './base';

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
