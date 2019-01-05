
/* IMPORT */

import * as _ from 'lodash';
import Utils from '../utils';

/* TODO */

const Todo = {

  boxSymbol: '☐',
  doneSymbol: '✔',
  cancelledSymbol: '✘',

  boxRe: /^[^\S\n]*((?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ ?\])\s[^\n@]*)/,
  doneRe: /^[^\S\n]*((?!--|––|——)(?:(?:[✔✓☑+]|\[[xX+]\])|\[ ?\])\s[^\n@]*)/,
  cancelledRe: /^[^\S\n]*((?!--|––|——)(?:(?:[✘xX]|\[-\])|\[ ?\])\s[^\n@]*)/,

  getTokens () {

    return {
      start: [
        { sol: true, regex: Todo.boxRe, token: 'todo-box' },
        { sol: true, regex: Todo.doneRe, token: 'todo-done' },
        { sol: true, regex: Todo.cancelledRe, token: 'todo-cancel' }
      ]
    };

  },

  toggleToken ( cm, token, removeToken, insertToken ) {

    Utils.walkSelections ( cm, ( line, lineNr ) => {

      const tokenIndex = line.indexOf ( `${token} ` ),
            isPrevTokenEmpty = !_.trim ( line.slice ( 0, tokenIndex ) ).length,
            otherIndex = line.search ( `${Todo.boxSymbol}|${Todo.doneSymbol}|${Todo.cancelledSymbol} ` ),
            isPrevOtherEmpty = !_.trim ( line.slice ( 0, otherIndex ) ).length;

      if ( tokenIndex >= 0 && isPrevTokenEmpty ) {

        const replacement = removeToken ? `${removeToken} ` : '';

        Utils.replace ( cm, lineNr, replacement, tokenIndex, tokenIndex + 2 );

      } else if ( otherIndex >= 0 && isPrevOtherEmpty ) {

        Utils.replace ( cm, lineNr, `${token} `, otherIndex, otherIndex + 2 );

      } else if ( insertToken ) {

        let spaceIndex = line.search ( /\S/ );

        if ( spaceIndex === -1 ) spaceIndex = line.length;

        Utils.replace ( cm, lineNr, `${insertToken} `, spaceIndex );

      }

    });

  },

  toggleBox ( cm ) {

    Todo.toggleToken ( cm, Todo.boxSymbol, '', Todo.boxSymbol );

  },

  toggleDone ( cm ) {

    Todo.toggleToken ( cm, Todo.doneSymbol, Todo.boxSymbol, Todo.doneSymbol );

  },

  toggleCancelled ( cm ) {

    Todo.toggleToken ( cm, Todo.cancelledSymbol, Todo.boxSymbol, Todo.cancelledSymbol );

  }

};

/* EXPORT */

export default Todo;
