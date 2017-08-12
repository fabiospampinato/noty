
/* IMPORT */

import '../../../node_modules/codemirror/addon/mode/simple.js';
import * as CodeMirror from 'codemirror';
import merge from 'conf-merge';
import Link from './link';
import Font from './font';

/* TOKENS */

const mode = merge ( {}, Link.getTokens (), Font.getTokens () );

CodeMirror.defineSimpleMode ( 'custom-mode', mode );
