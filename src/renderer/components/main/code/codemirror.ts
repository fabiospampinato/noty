
/* IMPORT */

import 'codemirror/addon/mode/simple.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/keymap/sublime.js';
import './addons/dialog.js';
import * as _ from 'lodash';
import * as CodeMirrorLib from 'codemirror/lib/codemirror';
import * as CodeMirror from 'codemirror';

/* WEIRD FIX */ //UGLY: Why the hell is this required? Why are `codemirror` and `codemirror/lib/codemirror` separate beasts? do they get cached on they own or something?

_.extend ( CodeMirror['keyMap'], CodeMirrorLib.keyMap );
_.extend ( CodeMirror['commands'], CodeMirrorLib.commands );
_.extend ( CodeMirror, CodeMirrorLib );

( CodeMirror as any ).prototype = CodeMirrorLib.prototype; //TSC

/* EXPORT */

export default CodeMirrorLib;
