
/* IMPORT */

import '../../../node_modules/codemirror/addon/search/search.js';
import '../../../node_modules/codemirror/keymap/sublime.js';
import './dialog.js';
import * as React from 'react';
import CodeMirror from 'react-codemirror2';
import addSelection from './add_selection';
import Todo from './todo';

/* OPTIONS */

const options = {
  lineSeparator: '\n',
  autofocus: true,
  lineNumbers: false,
  lineWrapping: true,
  indentUnit: 2,
  smartIndent: false,
  tabSize: 2,
  indentWithTabs: false,
  electricChars: false,
  scrollbarStyle: 'null',
  keyMap: 'sublime',
  extraKeys: {
    'Tab': 'indentMore',
    'Shift-Tab': 'indentLess',
    'Cmd-F': 'findPersistent',
    'Cmd-G': 'findPersistentNext',
    'Shift-Cmd-G': 'findPersistentPrev',
    'Shift-Cmd-H': 'replace',
    'Shift-Cmd-Alt-H': 'replaceAll',
    'Esc': 'clearSearch',
    'Ctrl-Cmd-Up': 'swapLineUp',
    'Ctrl-Cmd-Down': 'swapLineDown',
    'Alt-LeftClick': addSelection,
    'Cmd-Enter': Todo.toggleCheckbox,
    'Alt-D': Todo.toggleCheckmark,
    'Alt-C': Todo.toggleCancelmark,
    'F2': false,
    'Cmd-M': false,
  }
};

/* CODE */

const Code = ({ value, onChange, onEditor }) => <CodeMirror value={value} onValueChange={onChange} editorDidMount={onEditor} options={options} />;

/* EXPORT */

export default Code;
