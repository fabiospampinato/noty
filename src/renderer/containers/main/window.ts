
/* IMPORT */

import {remote} from 'electron';
import {Container} from 'overstated';

/* WINDOW */

class Window extends Container<WindowState, MainCTX> {

  /* STATE */

  state = {
    focus: !!remote.BrowserWindow.getFocusedWindow ()
  };

  /* API */

  isFocus = (): boolean => {

    return this.state.focus;

  }

  setFocus = ( focus: boolean ) => {

    return this.setState ({ focus });

  }

  close = () => {

    return remote.getCurrentWindow ().close ();

  }

}

/* EXPORT */

export default Window;
