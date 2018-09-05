
/* IMPORT */

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/app';

/* RENDER */

function render () {

  reactRender (
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById ( 'app' )
  );

}

/* EXPORT */

export default render;
