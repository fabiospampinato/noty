
/* IMPORT */

import merge from 'conf-merge';
import * as webpack from 'webpack';
import baseConfig from './base';

/* RENDERER */

const config = {
  target: 'electron-renderer',
  entry: {
    renderer: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './src/renderer/index.tsx'
    ]
  },
  output: {
    publicPath: 'http://localhost:3000/dist/'
  },
  plugins: [
    new webpack['HotModuleReplacementPlugin'] ()
  ]
};

/* EXPORT */

export default merge ( {}, baseConfig, config );
