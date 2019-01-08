
/* IMPORT */

import Environment from '@common/environment';

/* DEBUGGING */

async function debugging () {

  if ( !Environment.isDevelopment ) return;

  const {debug, HMR} = await import ( 'overstated' );

  debug.isEnabled = Environment.isDevelopment;
  debug.logStateChanges = false;

  HMR.isEnabled = Environment.isDevelopment;

}

/* EXPORT */

export default debugging;
