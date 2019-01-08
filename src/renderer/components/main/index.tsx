
/* IMPORT */

import * as React from 'react';
import {connect} from 'overstated';
import MainContainer from '@renderer/containers/main';
import IPC from './extra/ipc';
import Code from './code';
import Titlebar from './titlebar';
import Wrapper from './wrapper';

/* MAIN */

const Main = ({ index, note, notes, save, set, setEditor }) => {

  if ( !note ) {
    set ( notes[0].title );
    return null;
  }

  const titles = notes.map ( note => note.title ),
        id = `${note.title}-${index}`;

  return (
    <>
      <IPC />
      <Wrapper>
        <Titlebar title={note.title} titles={titles} onChange={e => set ( e.target.value )} />
        <div id="app-content">
          <Code id={id} value={note.content} onChange={( cm, meta, content ) => save ( note, content )} onEditor={setEditor} />
        </div>
      </Wrapper>
    </>
  );

};

/* EXPORT */

export default connect ({
  container: MainContainer,
  selector: ({ container }) => ({
    index: container.note.getIndex (),
    note: container.note.get (),
    notes: container.notes.get (),
    save: container.note.save,
    set: container.note.set,
    setEditor: container.editor.set
  })
})( Main );
