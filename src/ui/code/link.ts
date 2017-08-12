
/* IMPORT */

import * as $ from 'jquery';
import * as open from 'open';

/* LINK */

const Link = {

  re: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,

  getTokens () {

    return {
      start: [
        { regex: Link.re, token: 'link' }
      ]
    };

  },

  onClick () {

    $(document).off ( 'click' );
    $(document).on ( 'click', '.cm-link', event => {
      if ( !event.metaKey ) return;
      let url = $(event.target).text ();
      if ( !/^https?:\/\//i.test ( url ) ) {
        url = `http://${url}`;
      }
      open ( url );
    });

  }

}

/* INIT */

Link.onClick ();

/* EXPORT */

export default Link;
