
/* IMPORT */

import render from './render';

/* RENDERER */

render ();

/* HOT MODULE REPLACEMENT */

if ( module.hot ) {

  module.hot.accept ( './render', () => {
    require ( './render' ).default ();
  });

}
