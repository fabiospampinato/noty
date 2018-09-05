
/* IMPORT */

const path = require ( 'path' );

/* CONFIG */

const config = {
  resolve: {
    alias: {
      '@': path.resolve ( __dirname, 'src' ),
      '@common': path.resolve ( __dirname, 'src', 'common' ),
      '@main': path.resolve ( __dirname, 'src', 'main' ),
      '@renderer': path.resolve ( __dirname, 'src', 'renderer' ),
      '@root': __dirname,
      '@static': path.resolve ( __dirname, 'static' )
    }
  }
};

/* EXPORT */

module.exports = config;
