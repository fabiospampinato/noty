
/* IMPORT */

import * as _ from 'lodash';
import {app, Menu, shell} from 'electron';
import * as contextMenu from 'electron-context-menu';
import * as localShortcut from 'electron-localshortcut';
import * as Store from 'electron-store';
import * as project from '../../package.json';

/* UTILS */

const Utils = {

  initDebug () {

    if ( DEVELOPMENT ) {

      const debug = require ( 'electron-debug' );

      debug ({
        showDevTools: true
      });

      const {default: installExtension, REACT_DEVELOPER_TOOLS} = require ( 'electron-devtools-installer' );

      installExtension ( REACT_DEVELOPER_TOOLS );

    }

  },

  initContextMenu () {

    contextMenu ();

  },

  getStore () {

    return new Store ({
      defaults: {
        note: app.getName (),
        notes: [{
          title: app.getName (),
          content: 'Welcome to Noty\n\nSince we are using the FiraCode font you can type many glyphs like: -> ->> => ==> ~~> <-< <=< |> <| <>\n\nWe support To-Do lists by default:\n  ✔ Read the readme\n  ☐ Star the repository\n  ☐ Share with friends\n\nLinks: www.example.com\n\nFont styles: *Bold*, _Italic_ and ~Strikethrough~\n\nAnd multiple notes, try clicking the title to switch note.'
        }, {
          title: 'Another note',
          content: 'Pretty cool, huh?'
        }]
      }
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
            label: 'Open Configuration',
            click: () => global['store'].openInEditor ()
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
        label: 'Font',
        submenu: [
          {
            label: 'Bold',
            accelerator: 'cmd+b',
            click: () => win.webContents.send ( 'note-font-bold' )
          },
          {
            label: 'Italic',
            accelerator: 'cmd+i',
            click: () => win.webContents.send ( 'note-font-italic' )
          },
          {
            label: 'Strikethrough',
            accelerator: 'cmd+s',
            click: () => win.webContents.send ( 'note-font-strikethrough' )
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            role: 'reload',
            visible: DEVELOPMENT
          },
          {
            role: 'forcereload',
            visible: DEVELOPMENT
          },
          {
            role: 'toggledevtools',
            visible: DEVELOPMENT
          },
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
            label: 'Select Previous Note',
            accelerator: 'cmd+alt+left',
            click: () => win.webContents.send ( 'note-select-previous' )
          },
          {
            label: 'Select Next Note',
            accelerator: 'cmd+alt+right',
            click: () => win.webContents.send ( 'note-select-right' )
          },
          { type: 'separator' },
          {
            type: 'checkbox',
            label: 'Float on Top',
            checked: win.isAlwaysOnTop (),
            click: () => win.setAlwaysOnTop ( !win.isAlwaysOnTop () )
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

  },

  initLobalShortcuts ( win ) {

    /* CMD + 1/9 */

    const nrs = _.range ( 1, 10 );

    nrs.forEach ( nr => {
      localShortcut.register ( win, `Cmd+${nr}`, () => {
        win.webContents.send ( 'note-select', nr )
      });
    });

  }

};

/* EXPORT */

export default Utils;
