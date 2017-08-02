
/* IMPORT */

import {app, Menu, shell} from 'electron';
import * as contextMenu from 'electron-context-menu';
import * as Store from 'electron-store';
import * as project from '../../package.json';

/* UTILS */

const Utils = {

  initDebug () {

    if ( DEVELOPMENT ) {

      const debug = require ( 'electron-debug' );

      debug ({ showDevTools: false });

    }

  },

  initContextMenu () {

    contextMenu ();

  },

  getStore () {

    return new Store ({
      defaults: { //TODO: Make it more interesting, showcasing features and using multiple notes
        note: app.getName (),
        notes: [{
          title: app.getName (),
          content: '//TODO'
        }]
      },
      name: 'store',
      cwd: '/Users/fabio/Dropbox/Projects/noty/dist'
    });

  },

  initStore () {

    global['store'] = Utils.getStore ();

  },

  initAbout () {

    const {productName, version, license, author} = project as any;

    app.setAboutPanelOptions ({
      applicationName: productName,
      applicationVersion: version,
      copyright: `${license} © ${author.name}`,
      version: ''
    });

  },

  initMenu ( win ) {

    const template = [
      {
        label: app.getName (),
        submenu: [
          { role: 'about' },
          {
            label: 'Check for Updates...',
            click: () => shell.openExternal ( 'https://github.com/fabiospampinato/noty/releases' )
          },
          { type: 'separator' },
          { role: 'services', submenu: [] },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: 'File',
        submenu: [
          {
            label: 'New Note',
            accelerator: 'Cmd+N',
            click: () => win.webContents.send ( 'note-new' )
          },
          {
            label: 'Rename Note',
            accelerator: 'f2',
            click: () => win.webContents.send ( 'note-rename' )
          },
          {
            label: 'Delete Note',
            click: () => win.webContents.send ( 'note-delete' )
          },
          { type: 'separator' },
          {
            label: 'Open Config',
            click: () => global['store'].openInEditor ()
          },
          // {
          //   label: 'Print...'
          // }
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
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' }, //FIXME: Does it get removed when packaging?
          { role: 'forcereload' }, //FIXME: Does it get removed when packaging?
          { role: 'toggledevtools' }, //FIXME: Does it get removed when packaging?
          { type: 'separator' },
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
          { role: 'zoom' },
          { type: 'separator' },
          {
            type: 'checkbox',
            label: 'Float on Top',
            checked: win.isAlwaysOnTop (),
            click: () => win.setAlwaysOnTop ( !win.isAlwaysOnTop () );
          },
          { type: 'separator' },
          { role: 'front' }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: () => shell.openExternal ( 'https://github.com/fabiospampinato/noty' )
          },
          {
            label: 'Support',
            click: () => shell.openExternal ( 'https://github.com/fabiospampinato/noty/issues' )
          },
          { type: 'separator' },
          {
            label: 'View License',
            click: () => shell.openExternal ( 'https://github.com/fabiospampinato/noty/blob/master/LICENSE' )
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate ( template );
    Menu.setApplicationMenu ( menu );

  }

};

/* EXPORT */

export default Utils;
