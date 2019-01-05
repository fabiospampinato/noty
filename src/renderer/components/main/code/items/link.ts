
/* IMPORT */

import * as $ from 'cash-dom';
import {shell} from 'electron';

/* LINK */

const Link = {

  urlRe: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,

  getTokens () {

    return {
      start: [
        { regex: Link.urlRe, token: 'link' }
      ]
    };

  },

  onClick () {

    $(document).off ( 'click' ).on ( 'click', '.cm-link', event => {
      if ( !event.metaKey ) return;
      let url = $(event.target).text ();
      if ( !/^https?:\/\//i.test ( url ) ) {
        url = `http://${url}`;
      }
      shell.openExternal ( url );
    });

  },

  onMeta () {

    let meta = false;

    $(document).off ( 'keydown keyup' ).on ( 'keydown keyup', event => {
      if ( meta === event.metaKey ) return;
      meta = event.metaKey;
      $('html').toggleClass ( 'meta', meta );
    });

  }

}

/* INIT */

Link.onClick ();
Link.onMeta ();

/* EXPORT */

export default Link;
