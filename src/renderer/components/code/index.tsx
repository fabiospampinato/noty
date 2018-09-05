
/* IMPORT */

import * as _ from 'lodash';
import * as $ from 'jquery';
import * as is from 'electron-is';
import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
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
  lineSeparator: '\n',
  lineWrapping: true,
  mode: 'noty',
  scrollbarStyle: 'null',
  smartIndent: false,
  tabSize: 2,
  undoDepth: 1000,
  keyMap: 'sublime',
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

/* CODE */

class Code extends React.Component<any, any> {

  constructor ( props ) {

    super ( props );

    Utils.defineMode ();

  }

  shouldComponentUpdate ( nextProps ) {

    return this.props.id !== nextProps.id;

  }

  componentDidMount () {

    this._onScroll ();

  }

  _onScroll () {

    let scrolled = false;

    $('.CodeMirror-scroll').off ( 'scroll' ).on ( 'scroll', event => {
      if ( scrolled === !!event.currentTarget.scrollTop ) return;
      scrolled = !!event.currentTarget.scrollTop;
      $('html').toggleClass ( 'scrolled', scrolled );
    });

  }

  render () {

    const {value, onChange, onEditor} = this.props;

    return <CodeMirror value={value} onChange={onChange} editorDidMount={onEditor} options={options} />;

  }

}

/* EXPORT */

export default Code;
