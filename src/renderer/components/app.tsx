
/* IMPORT */

import '../template/index.scss';
import * as _ from 'lodash';
import * as React from 'react';
import {remote, ipcRenderer as ipc} from 'electron';
import * as Store from 'electron-store';
import Code from './code';
import Titlebar from './titlebar';

/* APP */

class App extends React.Component<any, any> {

  /* VARIABLES */

  _changeEditor; _changeNote; _changeContent; editor; store; storeObj;

  /* CONSTRUCTOR */

  constructor ( props ) {

    super ( props );

    this._changeEditor = this.changeEditor.bind ( this );
    this._changeNote = this.changeNote.bind ( this );
    this._changeContent = _.debounce ( this.changeContent.bind ( this ), 100 );

    this.store = new Store ({
      defaults: {
        note: remote.app.getName (),
        notes: [{
          title: remote.app.getName (),
          content: `Welcome to ${remote.app.getName ()}\n\nSince we are using the FiraCode font you can type many glyphs like: -> ->> => ==> ~~> <-< <=< |> <| <>\n\nWe support To-Do lists by default:\n  ✔ Read the readme\n  ☐ Star the repository\n  ☐ Share with friends\n\nLinks: www.example.com\n\nFont styles: *Bold*, _Italic_ and ~Strikethrough~\n\nAnd multiple notes, try clicking the title to switch note.`
        }, {
          title: 'Another note',
          content: 'Pretty cool, huh?'
        }]
      }
    });

    this.storeObj = this.store.get ();

    this.state = {
      focused: !!remote.BrowserWindow.getFocusedWindow ()
    };

  }

  /* SPECIAL */

  componentDidMount () {

    ipc.on ( 'store-open', this.storeOpen.bind ( this ) );
    ipc.on ( 'app-focus', this.focus.bind ( this ) );
    ipc.on ( 'app-blur', this.blur.bind ( this ) );
    ipc.on ( 'note-new', this.noteNew.bind ( this ) );
    ipc.on ( 'note-rename', this.noteRename.bind ( this ) );
    ipc.on ( 'note-delete', this.noteDelete.bind ( this ) );
    ipc.on ( 'note-select-number', ( event, nr ) => this.noteSelectNumber ( nr ) );
    ipc.on ( 'note-select-previous', this.noteSelectPrevious.bind ( this ) );
    ipc.on ( 'note-select-next', this.noteSelectNext.bind ( this ) );

  }

  componentWillUnmount () {

    ipc.removeAllListeners ( 'store-open' );
    ipc.removeAllListeners ( 'app-focus' );
    ipc.removeAllListeners ( 'app-blur' );
    ipc.removeAllListeners ( 'note-new' );
    ipc.removeAllListeners ( 'note-rename' );
    ipc.removeAllListeners ( 'note-delete' );
    ipc.removeAllListeners ( 'note-select-number' );
    ipc.removeAllListeners ( 'note-select-previous' );
    ipc.removeAllListeners ( 'note-select-next' );

  }

  /* UTILITIES */

  _updateStore () {

    this.store.set ( this.storeObj );

    this.forceUpdate ();

  }

  _getNoteIndexByTitle ( title ) {

    return this.storeObj.notes.findIndex ( note => note.title === title );

  }

  _getNoteByTitle ( title ) {

    return this.storeObj.notes.find ( note => note.title === title );

  }

  _getCurrentNoteIndex () {

    return this._getNoteIndexByTitle ( this.storeObj.note );

  }

  _getCurrentNote () {

    return this._getNoteByTitle ( this.storeObj.note );

  }

  /* API */

  storeOpen () {

    this.store.openInEditor ();

  }

  focus () {

    this.setState ({
      focused: true
    });

  }

  blur () {

    this.setState ({
      focused: false
    });

  }

  noteNew () {

    const template = '<span class="CodeMirror-search-label">Note name:</span> <input type="text" class="CodeMirror-search-field" />';

    this.editor.openDialog ( template, title => {

      if ( !title ) return;

      if ( this._getNoteByTitle ( title ) ) return alert ( 'Note names must be unique' ); //TODO: Use a notification dialog instead

      const content = '',
            note = { title, content };

      this.storeObj.note = title;
      this.storeObj.notes.push ( note );

      this._updateStore ();

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
      this.storeObj.note = title;

      this._updateStore ();

    }, { value: this.storeObj.note } );

  }

  noteDelete () {

    const note = this._getCurrentNote ();

    if ( !confirm ( `Are you sure you want to delete "${note.title}"?` ) ) return; //TODO: Use a confirmation dialog instead

    this.storeObj.notes = this.storeObj.notes.filter ( n => n.title !== note.title );

    if ( this.storeObj.notes.length ) {

      this.storeObj.note = this.storeObj.notes[0].title;

    } else {

      const defaultNote = {
        title: remote.app.getName (),
        content: ''
      };

      this.storeObj.note = defaultNote.title;
      this.storeObj.notes = [defaultNote];

    }

    this._updateStore ();

  }

  noteSelectNumber ( nr ) {

    const note = this.storeObj.notes[nr - 1];

    if ( !note ) return;

    this.storeObj.note = note.title;

    this._updateStore ();

    this.editor.doc.clearHistory ();

  }

  noteSelectNavigate ( modifier ) {

    const minNr = 0,
          maxNr = this.storeObj.notes.length - 1,
          currNr = this._getCurrentNoteIndex ();

    let nextNr = currNr + modifier;

    if ( nextNr > maxNr ) nextNr = minNr;
    if ( nextNr < minNr ) nextNr = maxNr;

    this.noteSelectNumber ( nextNr + 1 );

  }

  noteSelectPrevious () {

    this.noteSelectNavigate ( -1 );

  }

  noteSelectNext () {

    this.noteSelectNavigate ( 1 );

  }

  /* CHANGE */

  changeEditor ( cm ) {

    this.editor = cm;

  }

  changeNote ( event ) {

    this.storeObj.note = event.target.value;

    this._updateStore ();

  }

  changeContent ( cm, meta, content ) {

    const note = this._getCurrentNote ();

    note.content = content;

    this._updateStore ();

  }

  /* RENDER */

  render () {

    const note = this._getCurrentNote (),
          noteIndex = this._getCurrentNoteIndex (),
          titles = this.storeObj.notes.map ( note => note.title );

    return (
      <div id="app-wrapper" className={this.state.focused ? 'focused' : ''}>
        <Titlebar title={note.title} titles={titles} onChange={this._changeNote} />
        <div id="app-content">
          <Code id={`${noteIndex}-${note.title}`} value={note.content} onChange={this._changeContent} onEditor={this._changeEditor} />
        </div>
      </div>
    );

  }

}

/* EXPORT */

export default App;
