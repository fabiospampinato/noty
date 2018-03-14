
/* IMPORT */

import '../../../node_modules/codemirror/addon/mode/simple.js';
import * as CodeMirror from 'codemirror';
import merge from 'conf-merge';
import Link from './link';
import Font from './font';
import Tag from './tag';
import Todo from './todo';

/* TOKENS */

const mode = merge ( {}, Link.getTokens (), Font.getTokens (), Tag.getTokens (), Todo.getTokens () );

CodeMirror.defineSimpleMode ( 'custom-mode', mode );
