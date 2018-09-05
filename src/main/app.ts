
/* IMPORT */

import {app} from 'electron';
import {autoUpdater} from 'electron-updater';
import * as contextMenu from 'electron-context-menu';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as is from 'electron-is';
import Environment from '@common/enviroment';
import pkg from '@root/package.json';
import Main from './windows/main';
import Window from './windows/window';

/* APP */

class App {

  /* VARIABLES */

  win: Window;

  /* CONSTRUCTOR */

  constructor () {

    this.init ();
    this.events ();

  }

  /* SPECIAL */

  init () {

    this.initAbout ();
    this.initContextMenu ();

  }

  initAbout () {

    if ( !is.macOS () ) return;

    const {productName, version, license, author} = pkg;

    app.setAboutPanelOptions ({
      applicationName: productName,
      applicationVersion: version,
      copyright: `${license} © ${author.name}`,
      version: ''
    });

  }

  initContextMenu () {

    contextMenu ();

  }

  initDebug () {

    if ( !Environment.isDevelopment ) return;

    installExtension ( REACT_DEVELOPER_TOOLS );

  }

  events () {

    this.___windowAllClosed ();
    this.___activate ();
    this.___ready ();

  }

  /* WINDOW ALL CLOSED */

  ___windowAllClosed () {

    app.on ( 'window-all-closed', this.__windowAllClosed.bind ( this ) );

  }

  __windowAllClosed () {

    if ( is.macOS () ) return;

    app.quit ();

  }

  /* ACTIVATE */

  ___activate () {

    app.on ( 'activate', this.__activate.bind ( this ) );

  }

  __activate () {

    if ( this.win && this.win.win ) return;

    this.win = new Main ();

  }

  /* READY */

  ___ready () {

    app.on ( 'ready', this.__ready.bind ( this ) );

  }

  __ready () {

    this.initDebug ();

    autoUpdater.checkForUpdatesAndNotify ();

    this.win = new Main ();

  }

}

/* EXPORT */

export default App;
