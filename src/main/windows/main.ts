
/* IMPORT */

import * as _ from 'lodash';
import {app, ipcMain as ipc, Menu, MenuItemConstructorOptions, shell} from 'electron';
import * as is from 'electron-is';
import * as localShortcut from 'electron-localshortcut';
import * as path from 'path';
import {format as formatURL} from 'url';
import Environment from '@common/enviroment';
import pkg from '@root/package.json';
import UMenu from '../utils/menu';
import Window from './window';

/* MAIN */

class Main extends Window {

  /* CONSTRUCTOR */

  constructor ( options = { minWidth: 150, minHeight: 100 }, stateOptions = { defaultWidth: 250, defaultHeight: 450 } ) {

    super ( options, stateOptions );

  }

  /* SPECIAL */

  events () {

    super.events ();

    this.___focus ();
    this.___blur ();
    this.___windowClose ();

  }

  /* FOCUS */

  ___focus () {

    this.win.on ( 'focus', this.__focus.bind ( this ) );

  }

  __focus () {

    this.win.webContents.send ( 'app-focus' );

  }

  /* BLUR */

  ___blur () {

    this.win.on ( 'blur', this.__blur.bind ( this ) );

  }

  __blur () {

    this.win.webContents.send ( 'app-blur' );

  }

  /* WINDOW CLOSE */

  ___windowClose () {

    ipc.on ( 'window-close', this.__windowClose.bind ( this ) );

  }

  __windowClose () {

    this.win.close ();

  }

  /* SPECIAL */

  initLocalShortcuts () {

    /* CommandOrControl + 1-9 */

    _.range ( 1, 10 ).forEach ( nr => {
      localShortcut.register ( this.win, `CommandOrControl+${nr}`, () => {
        this.win.webContents.send ( 'note-select-number', nr );
      });
    });

  }

  initMenu () {

    const template: MenuItemConstructorOptions[] = UMenu.filterTemplate ([
      {
        label: app.getName (),
        submenu: [
          {
            role: 'about',
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'services',
            submenu: [] ,
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'hide',
            visible: is.macOS ()
          },
          {
            role: 'hideothers',
            visible: is.macOS ()
          },
          {
            role: 'unhide',
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          { role: 'quit' }
        ]
      },
      {
        label: 'Note',
        submenu: [
          {
            label: 'New',
            accelerator: 'CommandOrControl+N',
            click: () => this.win.webContents.send ( 'note-new' )
          },
          {
            label: 'Rename',
            accelerator: 'f2',
            click: () => this.win.webContents.send ( 'note-rename' )
          },
          {
            label: 'Delete',
            accelerator: 'CommandOrControl+Alt+Backspace',
            click: () => this.win.webContents.send ( 'note-delete' )
          },
          { type: 'separator' },
          {
            label: 'Open Configuration',
            click: () => this.win.webContents.send ( 'store-open' )
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          // { role: 'undo' },
          // { role: 'redo' },
          // { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ],
            visible: is.macOS ()
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            role: 'reload',
            visible: Environment.isDevelopment
          },
          {
            role: 'forcereload',
            visible: Environment.isDevelopment
          },
          {
            role: 'toggledevtools',
            visible: Environment.isDevelopment
          },
          {
            type: 'separator',
            visible: Environment.isDevelopment
          },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'close' },
          { role: 'minimize' },
          {
            role: 'zoom',
            visible: is.macOS ()
          },
          { type: 'separator' },
          {
            label: 'Select Previous Note',
            accelerator: 'CommandOrControl+Alt+Left',
            click: () => this.win.webContents.send ( 'note-select-previous' )
          },
          {
            label: 'Select Previous Note',
            accelerator: 'Shift+Ctrl+Tab',
            click: () => this.win.webContents.send ( 'note-select-previous' )
          },
          {
            label: 'Select Next Note',
            accelerator: 'CommandOrControl+Alt+Right',
            click: () => this.win.webContents.send ( 'note-select-next' )
          },
          {
            label: 'Select Next Note',
            accelerator: 'Ctrl+Tab',
            click: () => this.win.webContents.send ( 'note-select-next' )
          },
          { type: 'separator' },
          {
            type: 'checkbox',
            label: 'Float on Top',
            checked: this.win.isAlwaysOnTop (),
            click: () => this.win.setAlwaysOnTop ( !this.win.isAlwaysOnTop () )
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'front',
            visible: is.macOS ()
          }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: () => shell.openExternal ( pkg.homepage )
          },
          {
            label: 'Support',
            click: () => shell.openExternal ( pkg.bugs.url )
          },
          { type: 'separator' },
          {
            label: 'View License',
            click: () => shell.openExternal ( `${pkg.homepage}/blob/master/LICENSE` )
          }
        ]
      }
    ]);

    const menu = Menu.buildFromTemplate ( template );

    Menu.setApplicationMenu ( menu );

  }

  /* API */

  load () {

    if ( Environment.isDevelopment ) {

      const {protocol, hostname, port} = Environment.wds;

      this.win.loadURL ( `${protocol}://${hostname}:${port}` );

    } else {

      this.win.loadURL ( formatURL ({
        pathname: path.join ( __dirname, 'index.html' ),
        protocol: 'file',
        slashes: true
      }));

    }

  }

}

/* EXPORT */

export default Main;
