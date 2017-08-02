
/* IMPORT */

import * as _ from 'lodash';
import * as React from 'react';
import {remote, ipcRenderer as ipc} from 'electron';
import Code from 'ui/code';
import Titlebar from 'ui/titlebar';
import 'ui/template/index.scss';

/* APP */

class App extends React.Component<any, any> {

  _changeNote; _changeContent; store;

  /* SPECIAL */

  constructor () {

    super ();

    this._changeNote = this.changeNote.bind ( this );
    this._changeContent = _.debounce ( this.changeContent.bind ( this ), 100 );

    this.store = remote.getGlobal ( 'store' );

    this.state = {
      focused: false,
      store: this.store.get ()
    };

  }

  componentDidMount () {

    ipc.on ( 'note-new', this.noteNew.bind ( this ) );
    ipc.on ( 'note-rename', this.noteRename.bind ( this ) );
    ipc.on ( 'note-delete', this.noteDelete.bind ( this ) );
    ipc.on ( 'app-focus', () => this.changeFocused ( true ) );
    ipc.on ( 'app-blur', () => this.changeFocused ( false ) );

  }

  componentWillUnmount () {

    ipc.removeAllListeners ( 'note-new' );
    ipc.removeAllListeners ( 'note-rename' );
    ipc.removeAllListeners ( 'note-delete' );
    ipc.removeAllListeners ( 'app-focus' );
    ipc.removeAllListeners ( 'app-blur' );

  }

  /* UTILITIES */

  _setStore () {

    this.store.set ( this.state.store );

    this.forceUpdate ();

  }

  _getNoteByTitle ( title ) {

    return this.state.store.notes.find ( note => note.title === title );

  }

  _getCurrentNote () {

    return this._getNoteByTitle ( this.state.store.note );

  }

  /* NOTE */

  noteNew () {

    console.log ( 'NEW' );

  }

  noteRename () {

    console.log ( 'RENAME' );

  }

  noteDelete () {

    const note = this._getCurrentNote ();

    if ( !confirm ( `Are you sure you want to delete "${note.title}"?` ) ) return;

    this.state.store.notes = this.state.store.notes.filter ( n => n.title !== note.title );

    if ( this.state.store.notes.length ) {

      this.state.store.note = this.state.store.notes[0].title;

    } else {

      const newNote = {
        title: remote.app.getName (),
        content: ''
      };

      this.state.store.note = newNote.title;
      this.state.store.notes = [newNote];

    }

    this._setStore ();

  }

  /* CHANGE */

  changeFocused ( focused ) {

    this.setState ({ focused });

  }

  changeNote ( event ) {

    this.state.store.note = event.target.value;

    this._setStore ();

  }

  changeContent ( cm, meta, content ) {

    const note = this._getCurrentNote ();

    note.content = content;

    this._setStore ();

  }

  /* RENDER */

  render () {

    const note = this._getCurrentNote (),
          titles = this.state.store.notes.map ( note => note.title );

    return (
      <div id="app" className={this.state.focused ? 'focused' : ''}>
        <Titlebar title={note.title} titles={titles} onChange={this._changeNote} />
        <div id="content">
          <Code value={note.content} onChange={this._changeContent} />
        </div>
      </div>
    );

  }

}

/* EXPORT */

export default App;
