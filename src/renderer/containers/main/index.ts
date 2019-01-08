
/* IMPORT */

import {Container, compose} from 'overstated';
import Editor from './editor';
import Note from './note';
import Notes from './notes';
import Window from './window';

/* MAIN */

class Main extends Container<MainState, MainCTX> {}

/* EXPORT */

export default compose ({
  editor: Editor,
  note: Note,
  notes: Notes,
  window: Window
})( Main ) as IMain;
