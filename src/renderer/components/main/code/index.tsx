
/* IMPORT */

import * as is from 'electron-is';
import {connect} from 'overstated';
import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import Main from '@renderer/containers/main';
import Utils from './utils';
import Font from './items/font';
import Todo from './items/todo';

/* OPTIONS */

const CTMD = is.macOS () ? 'Cmd' : 'Ctrl', // `Cmd` on macOS, `Ctrl` otherwise
      ALMD = is.macOS () ? 'Cmd' : 'Alt'; // `Cmd` on macOS, `Alt` otherwise

const options: any = { //TSC
  autofocus: true,
  electricChars: false,
  indentUnit: 2,
  indentWithTabs: false,
  lineNumbers: false,
  lineWrapping: true,
  mode: 'noty',
  scrollbarStyle: 'native',
  smartIndent: false,
  tabSize: 2,
  undoDepth: 1000,
  keyMap: 'sublime',
  viewportMargin: Infinity,
  extraKeys: {
    'Backspace': 'delCharBefore',
    [`${CTMD}-Z`]: 'undo',
    [`${CTMD}-Shift-Z`]: 'redo',
    'Tab': 'indentMore',
    'Shift-Tab': 'indentLess',
    [`${CTMD}-F`]: 'findPersistent',
    [`${CTMD}-G`]: 'findPersistentNext',
    [`${CTMD}-Shift-G`]: 'findPersistentPrev',
    [`${CTMD}-Shift-H`]: 'replace',
    [`${CTMD}-Shift-Alt-H`]: 'replaceAll',
    'Esc': 'clearSearch',
    [`${ALMD}-Ctrl-Up`]: 'swapLineUp',
    [`${ALMD}-Ctrl-Down`]: 'swapLineDown',
    'Alt-LeftClick': Utils.addSelection,
    [`${CTMD}-Enter`]: Todo.toggleBox,
    'Alt-D': Todo.toggleDone,
    'Alt-C': Todo.toggleCancelled,
    [`${CTMD}-B`]: Font.toggleBold,
    [`${CTMD}-\``]: Font.toggleCode,
    [`${CTMD}-I`]: Font.toggleItalic,
    [`${CTMD}-S`]: Font.toggleStrikethrough,
    'F2': false,
    [`${CTMD}-M`]: false,
    [`${CTMD}-H`]: false,
    [`${CTMD}-LeftClick`]: false
  }
};

Utils.defineMode ();

/* CODE */

class Code extends React.PureComponent<any, undefined> {

  componentDidMount () {

    this.props.reset ();

  }

  componentDidUpdate () {

    this.props.reset ();

  }

  render () {

    const {value, onChange, onEditor, onScroll} = this.props;

    return <CodeMirror value={value} onChange={onChange} onScroll={onScroll} editorDidMount={onEditor} options={options} />;

  }

}

/* EXPORT */

export default connect ({
  container: Main,
  shouldComponentUpdate: 'id',
  selector: ({ container, value, onChange, onEditor }) => ({
    value, onChange, onEditor,
    reset: container.editor.reset,
    onScroll: container.editor.onScroll
  })
})( Code );
