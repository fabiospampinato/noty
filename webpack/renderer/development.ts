
/* IMPORT */

import * as webpack from 'webpack';

/* CONFIG */

const config = {
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

export default config;
