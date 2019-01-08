
/* IMPORT */

import {Container} from 'overstated';
import Settings from '@common/settings';

/* NOTES */

class Notes extends Container<NotesState, MainCTX> {

  /* STATE */

  state = {
    notes: Settings.get ( 'notes' )
  };

  /* API */

  get = (): NoteObj[] => {

    return this.state.notes;

  }

  set = ( notes: NoteObj[] ) => {

    Settings.set ( 'notes', notes );

    return this.setState ({ notes });

  }

}

/* EXPORT */

export default Notes;
