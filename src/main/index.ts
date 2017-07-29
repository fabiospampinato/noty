
/* IMPORT */

import * as debug from 'electron-debug';
import {app, BrowserWindow} from 'electron';

/* MAIN */

debug ({ showDevTools: false });

let win;

app.on ( 'window-all-closed', app.quit.bind ( app ) );
app.on ( 'ready', () => {

  win = new BrowserWindow ({
    title: app.getName (),
    width: 250,
    height: 450
  });

  win.loadURL ( `file:///Users/fabio/Desktop/noty/src/ui/app.html` ); //FIXME: HACK

  win.on ( 'ready-to-show', () => {
    win.show ();
    win.focus ();
  });

  win.on ( 'closed', () => {
    win = null;
  });

});
