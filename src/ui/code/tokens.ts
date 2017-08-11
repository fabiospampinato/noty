
/* IMPORT */

import '../../../node_modules/codemirror/addon/mode/simple.js';
import * as $ from 'jquery';
import * as CodeMirror from 'codemirror';
import * as open from 'open';

/* TOKENS */

const linkRe = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

CodeMirror.defineSimpleMode ( 'noty-tokens', {
  start: [
    {
      regex: linkRe,
      token: 'link'
    }
  ]
});

/* HANDLERS */

$(document).off ( 'click' );
$(document).on ( 'click', '.cm-link', event => {
  if ( !event.metaKey ) return;
  let url = $(event.target).text ();
  if ( !/^https?:\/\//i.test ( url ) ) {
    url = `http://${url}`;
  }
  open ( url );
});
