
/* IMPROT */

import merge from 'conf-merge';
import baseConfig from '../base';

/* ENVIRONMENT */

const ENVIRONMENT = process.env.NODE_ENV || 'development';

/* CONFIG */

const envConfig = require ( `./${ENVIRONMENT}` ).default;

const config = {
  target: 'electron-renderer'
};

/* EXPORT */

export default merge ( {}, baseConfig, config, envConfig );
