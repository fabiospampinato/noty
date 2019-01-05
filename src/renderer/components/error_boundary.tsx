
/* IMPORT */

import {shell} from 'electron';
import * as React from 'react';
import pkg from '@root/package.json';

/* ERROR BOUNDARY */

class ErrorBoundary extends React.Component<any, { error?: Error }> {

  /* STATE */

  state = {
    error: undefined as Error | undefined
  };

  /* SPECIAL */

  componentDidCatch ( error: Error ) {

    this.setState ({ error });

  }

  /* API */

  report = () => {

    shell.openExternal ( pkg.bugs.url );

  }

  /* RENDER */

  render () {

    const {error} = this.state;

    if ( !error ) return this.props.children;

    return (
      <div id="error-boundary">
        <div id="titlebar">
          <div id="titlebar-title">An Error Occurred!</div>
        </div>
        <pre className="error-stack">{error.stack}</pre>
        <div className="button" onClick={this.report}>Report It</div>
      </div>
    );

  }

}

/* EXPORT */

export default ErrorBoundary;
