
/* IMPORT */

import * as _ from 'lodash';
import {app, BrowserWindow, ipcMain as ipc} from 'electron';
// import * as is from 'electron-is';
import * as windowStateManager from 'electron-window-state';
import Utils from './utils';

/* MAIN */

Utils.initDebug ();
Utils.initContextMenu ();
Utils.initAbout ();
Utils.initStore ();

app.dock.setIcon ( 'assets/images/icon/icon.png' ); //TODO: Remove this, shouldn't be necessary after packaging

let win;

app.on ( 'window-all-closed', () => {
  // if ( is.macOS () ) return;
  app.quit ();
});

app.on ( 'ready', () => {

  const windowState = windowStateManager ({
    defaultWidth: 250,
    defaultHeight: 450
  });

  win = new BrowserWindow ( _.extend ( _.pick ( windowState, ['x', 'y', 'width', 'height'] ), {
    frame: false,
    show: false,
    title: app.getName (), //FIXME
    icon: 'assets/images/icon/icon.png',
    backgroundColor: '#fef3a1'
  }));

  Utils.initMenu ( win );

  win.on ( 'ready-to-show', () => {
    win.show ();
    win.focus ();
  });

  win.on ( 'closed', () => {
    win = null;
  });

  win.on ( 'focus', () => {
    win.webContents.send ( 'app-focus' );
  });

  win.on ( 'blur', () => {
    win.webContents.send ( 'app-blur' );
  });

  ipc.on ( 'window-close', () => {
    win.close ();
  });

  win.loadURL ( `file:///Users/fabio/Dropbox/Projects/noty/src/ui/app/index.html` ); //FIXME: HACK

  windowState.manage ( win );

  if ( DEVELOPMENT ) {  //TODO: Remove this, maybe

    setInterval ( () => windowState.saveState ( win ), 1000 );

  }

});
