
/* IMPORT */

import * as _ from 'lodash';
import {app, BrowserWindow, ipcMain as ipc} from 'electron';
// import * as is from 'electron-is';
import * as windowStateManager from 'electron-window-state';
import * as path from 'path';
import Utils from './utils';

/* MAIN */

Utils.initContextMenu ();
Utils.initAbout ();
Utils.initStore ();

let win;

app.on ( 'window-all-closed', () => {
  // if ( is.macOS () ) return;
  app.quit ();
});

app.on ( 'ready', () => {

  Utils.initDebug ();

  const windowState = windowStateManager ({
    defaultWidth: 250,
    defaultHeight: 450
  });

  win = new BrowserWindow ( _.extend ( _.pick ( windowState, ['x', 'y', 'width', 'height'] ), {
    frame: false,
    show: false,
    title: app.getName (),
    backgroundColor: '#fef3a1'
  }));

  Utils.initMenu ( win );
  Utils.initLobalShortcuts ( win );

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

  win.loadURL ( `file://${path.join ( __filename, '../index.html' )}` );

  windowState.manage ( win );

  if ( DEVELOPMENT ) {

    setInterval ( () => windowState.saveState ( win ), 1000 );

  }

});
