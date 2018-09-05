
/* IMPORT */

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Environment from '@common/enviroment';
import App from './components/app';

/* RENDER */

function render () {

  reactRender (
    Environment.isDevelopment ? <AppContainer><App /></AppContainer> : <App />,
    document.getElementById ( 'app' )
  );

}

/* EXPORT */

export default render;
