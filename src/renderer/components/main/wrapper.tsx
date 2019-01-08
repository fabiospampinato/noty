
/* IMPORT */

import * as React from 'react';
import {connect} from 'overstated';
import Main from '@renderer/containers/main';

/* WRAPPER */

const Wrapper = ({ children, isFocus, isScroll }) => (
  <div id="app-wrapper" className={`${isFocus ? 'focused' : ''} ${isScroll ? 'scrolled' : ''}`}>
    {children}
  </div>
);

/* EXPORT */

export default connect ({
  container: Main,
  selector: ({ children, container }) => ({
    children,
    isFocus: container.window.isFocus (),
    isScroll: container.editor.isScroll ()
  })
})( Wrapper );
