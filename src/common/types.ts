
/* GLOBALS */

declare const __static: string;

/* BASE OBJECTS */

type NoteObj = {
  title: string,
  content: string
};

/* MAIN CONTAINERS STATES */

type EditorState = {
  editor: import ( 'codemirror' ).Editor | undefined,
  scroll: boolean
};

type NoteState = {
  note: NoteObj | undefined
};

type NotesState = {
  notes: NoteObj[]
};

type WindowState = {
  focus: boolean
};

/* MAIN */

type MainState = {
  editor: EditorState,
  note: NoteState,
  notes: NotesState,
  window: WindowState
};

type MainCTX = {
  editor: import ( '@renderer/containers/main/editor' ).default,
  note: import ( '@renderer/containers/main/note' ).default,
  notes: import ( '@renderer/containers/main/notes' ).default,
  window: import ( '@renderer/containers/main/window' ).default
};

type IMain = MainCTX & { ctx: MainCTX };
