
/* IMPORT */

import '@renderer/template/index.scss';

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import Identity from 'react-component-identity';
import {Router} from 'react-router-static';
import Environment from '@common/environment';
import Routes from './routes';
import ErrorBoundary from './components/error_boundary';

/* RENDER */

async function render () {

  const AppContainer = Environment.isDevelopment ? ( await import ( 'react-hot-loader' ) ).AppContainer : Identity;

  reactRender (
    <AppContainer>
      <ErrorBoundary>
        <Router routes={Routes} />
      </ErrorBoundary>
    </AppContainer>,
    document.getElementById ( 'app' )
  );

}

/* EXPORT */

export default render;
