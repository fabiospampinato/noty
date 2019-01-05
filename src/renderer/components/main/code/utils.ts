
/* IMPORT */

import * as _ from 'lodash';
import merge from 'conf-merge';
import CodeMirror from './codemirror';
import Items from './items';

/* UTILS */

const Utils = {

  defineMode () {

    const tokensAll = merge ( {}, ...Items.map ( item => item.getTokens () ) );

    CodeMirror.defineSimpleMode ( 'noty', tokensAll );

  },

  addSelection ( cm, pos ) {

    cm.getDoc ().addSelection ( pos );

  },

  walkSelections ( cm, callback ) {

    cm.listSelections ().forEach ( selection => {

      const lineNr = Math.min ( selection.anchor.line, selection.head.line ),
            line = cm.getLine ( lineNr );

      callback ( line, lineNr );

    });

  },

  replace ( cm, lineNr, replacement, fromCh, toCh? ) {

    const from = { line: lineNr, ch: fromCh };

    if ( _.isUndefined ( toCh ) ) {

      cm.replaceRange ( replacement, from );

    } else {

      const to = { line: lineNr, ch: toCh };

      cm.replaceRange ( replacement, from, to );

    }

  }

};

/* EXPORT */

export default Utils;
