
/* IMPORT */

const packager = require ( 'electron-packager' );

/* PACKAGE */

const options = {
  dir: '.',
  out: 'releases',
  asar: true,
  overwrite: true,
  prune: true,
  icon: 'resources/icon/icon.icns',
  ignore: /^\/(\.awcache|releases|resources|src|types|typings|webpack)/
};

packager ( options, err => {
  if ( !err ) return;
  console.error ( err );
});
