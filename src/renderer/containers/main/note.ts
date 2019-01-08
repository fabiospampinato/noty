
/* IMPORT */

import * as _ from 'lodash';
import Dialog from 'electron-dialog';
import {Container} from 'overstated';
import pkg from '@root/package.json';
import Settings from '@common/settings';

/* NOTE */

class Note extends Container<NoteState, MainCTX> {

  /* STATE */

  state = {
    note: Settings.get ( 'notes' ).find ( note => note.title === Settings.get ( 'note' ) ) //FIXME: Ugly and slow
  };

  /* API */

  get = ( title?: string ): NoteObj | undefined => {

    if ( !title ) return this.state.note;

    const notes = this.ctx.notes.get ();

    return notes.find ( note => note.title === title );

  }

  getIndex = ( note: NoteObj | undefined = this.state.note ) => {

    const notes = this.ctx.notes.get ();

    return notes.findIndex ( n => n === note || n.title === note.title );

  }

  add = async ( title?: string, content: string = '' ) => {

    title = title || await this.ctx.editor.dialog ( 'Note name:' );

    if ( !title ) return;

    if ( this.get ( title ) ) return Dialog.alert ( 'Note names must be unique' ); //TODO: Use a notification dialog instead

    const notes = _.clone ( this.ctx.notes.get () ),
          note = { title, content };

    notes.push ( note );

    this.ctx.notes.set ( notes );
    this.set ( title );

  }

  rename = async ( note: NoteObj | undefined = this.state.note ) => {

    if ( !note ) return;

    const title = await this.ctx.editor.dialog ( 'Note name:', { value: note.title } );

    if ( !title || note.title === title ) return;

    if ( this.get ( title ) ) return Dialog.alert ( 'Note names must be unique' ); //TODO: Use a notification dialog instead

    const noteNext = _.clone ( note );

    noteNext.title = title;

    return this.replace ( note, noteNext );

  }

  delete = ( note: NoteObj | undefined = this.state.note ) => {

    if ( !note ) return;

    if ( !Dialog.confirm ( `Are you sure you want to delete "${note.title}"?` ) ) return; //TODO: Use a confirmation dialog instead

    const notes = this.ctx.notes.get (),
          notesNext = notes.filter ( n => n.title !== note.title );

    this.ctx.notes.set ( notesNext );

    if ( !notesNext.length ) {

      this.add ( pkg.productName );

    } else if ( !this.get ( note.title ) ) {

      this.set ( notesNext[0].title );

    }

  }

  save = ( note: NoteObj | undefined = this.state.note, content: string ) => {

    if ( !note ) return;

    if ( note !== this.get () ) return; //Ugly: we only switched note

    const noteNext = _.clone ( note );

    noteNext.content = content;

    return this.replace ( note, noteNext );

  }

  replace = ( note: NoteObj, noteNext: NoteObj ) => {

    const notes = this.ctx.notes.get (),
          notesNext = notes.map ( n => n.title === note.title ? noteNext : n );

    this.ctx.notes.set ( notesNext );

    if ( note.title === noteNext.title ) return;

    this.set ( noteNext.title );

  }

  set = ( title: string ) => {

    const note = this.get ( title );

    if ( !note ) return;

    Settings.set ( 'note', title );

    return this.setState ({ note });

  }

  selectNumber = ( nr: number ) => {

    const notes = this.ctx.notes.get (),
          note = notes[nr - 1];

    if ( !note ) return;

    return this.set ( note.title );

  }

  selectNavigate = ( modifier: number ) => {

    const notes = this.ctx.notes.get (),
          note = this.get ();

    if ( !note ) return;

    const minNr = 0,
          maxNr = notes.length - 1,
          currNr = this.getIndex ( note );

    let nextNr = currNr + modifier;

    if ( nextNr > maxNr ) nextNr = minNr;
    if ( nextNr < minNr ) nextNr = maxNr;

    return this.selectNumber ( nextNr + 1 );

  }

  selectPrevious = () => {

    return this.selectNavigate ( -1 );

  }

  selectNext = () => {

    return this.selectNavigate ( 1 );

  }

}

/* EXPORT */

export default Note;
