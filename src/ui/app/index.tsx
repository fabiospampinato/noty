
/* IMPORT */

import * as _ from 'lodash';
import * as React from 'react';
import {remote, ipcRenderer as ipc} from 'electron';
import Code from 'ui/code';
import Titlebar from 'ui/titlebar';
import 'ui/template/index.scss';
import './index.html';

/* APP */

class App extends React.Component<any, any> {

  _changeEditor; _changeNote; _changeContent; editor; store;

  /* SPECIAL */

  constructor () {

    super ();

    this._changeEditor = this.changeEditor.bind ( this );
    this._changeNote = this.changeNote.bind ( this );
    this._changeContent = _.debounce ( this.changeContent.bind ( this ), 100 );

    this.store = remote.getGlobal ( 'store' );

    this.state = {
      focused: true,
      store: this.store.get ()
    };

  }

  componentDidMount () {

    ipc.on ( 'note-new', this.noteNew.bind ( this ) );
    ipc.on ( 'note-rename', this.noteRename.bind ( this ) );
    ipc.on ( 'note-delete', this.noteDelete.bind ( this ) );
    ipc.on ( 'note-select', this.noteSelect.bind ( this ) );
    ipc.on ( 'note-select-previous', this.noteSelectPrevious.bind ( this ) );
    ipc.on ( 'note-select-right', this.noteSelectNext.bind ( this ) );
    ipc.on ( 'app-focus', () => this.changeFocused ( true ) );
    ipc.on ( 'app-blur', () => this.changeFocused ( false ) );

  }

  componentWillUnmount () {

    ipc.removeAllListeners ( 'note-new' );
    ipc.removeAllListeners ( 'note-rename' );
    ipc.removeAllListeners ( 'note-delete' );
    ipc.removeAllListeners ( 'note-select' );
    ipc.removeAllListeners ( 'note-select-previous' );
    ipc.removeAllListeners ( 'note-select-right' );
    ipc.removeAllListeners ( 'app-focus' );
    ipc.removeAllListeners ( 'app-blur' );

  }

  /* UTILITIES */

  _setStore () {

    this.store.set ( this.state.store );

    this.forceUpdate ();

  }

  _getNoteIndexByTitle ( title ) {

    return this.state.store.notes.findIndex ( note => note.title === title );

  }

  _getNoteByTitle ( title ) {

    return this.state.store.notes.find ( note => note.title === title );

  }

  _getCurrentNoteIndex () {

    return this._getNoteIndexByTitle ( this.state.store.note );

  }

  _getCurrentNote () {

    return this._getNoteByTitle ( this.state.store.note );

  }

  /* NOTE */

  noteNew () {

    const template = '<span class="CodeMirror-search-label">Note name:</span> <input type="text" class="CodeMirror-search-field" />';

    this.editor.openDialog ( template, title => {

      if ( !title ) return;

      if ( this._getNoteByTitle ( title ) ) return alert ( 'Note names must be unique' ); //TODO: Use a notification dialog instead

      const content = '',
            note = { title, content };

      this.state.store.note = title;
      this.state.store.notes = this.state.store.notes.concat ([ note ]);

      this._setStore ();

    });

  }

  noteRename () {

    const template = '<span class="CodeMirror-search-label">Note name:</span> <input type="text" class="CodeMirror-search-field" />';

    this.editor.openDialog ( template, title => {

      if ( !title ) return;

      const note = this._getCurrentNote ();

      if ( note.title === title ) return;

      if ( this._getNoteByTitle ( title ) ) return alert ( 'Note names must be unique' ); //TODO: Use a notification dialog instead

      note.title = title;
      this.state.store.note = title;

      this._setStore ();

    }, { value: this.state.store.note } );

  }

  noteDelete () {

    const note = this._getCurrentNote ();

    if ( !confirm ( `Are you sure you want to delete "${note.title}"?` ) ) return; //TODO: Use a confirmation dialog instead

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

  noteSelect ( event, nr ) {

    const note = this.state.store.notes[nr - 1];

    if ( !note ) return;

    this.state.store.note = note.title;

    this._setStore ();

  }

  noteSelectNavigate ( modifier ) {

    const minNr = 0,
          maxNr = this.state.store.notes.length - 1,
          currNr = this._getCurrentNoteIndex ();

    let nextNr = currNr + modifier;

    if ( nextNr > maxNr ) nextNr = minNr;
    if ( nextNr < minNr ) nextNr = maxNr;

    this.noteSelect ( undefined, nextNr + 1 );

  }

  noteSelectPrevious () {

    this.noteSelectNavigate ( -1 );

  }

  noteSelectNext () {

    this.noteSelectNavigate ( 1 );

  }

  /* CHANGE */

  changeFocused ( focused ) {

    this.setState ({ focused });

  }

  changeEditor ( cm ) {

    this.editor = cm;

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
          <Code value={note.content} onChange={this._changeContent} onEditor={this._changeEditor} />
        </div>
      </div>
    );

  }

}

/* EXPORT */

export default App;
