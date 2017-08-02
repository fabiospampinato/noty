
/* IMPORT */

import Utils from './utils';

/* TODO */

const Todo = {

  CHECKBOX: '☐',
  CHECKMARK: '✔',
  CANCELMARK: '✘',

  toggleToken ( cm, token, removeToken, insertToken? ) {

    Utils.walkSelections ( cm, ( line, lineNr ) => {

      const tokenIndex = line.indexOf ( `${token} ` ),
            otherIndex = line.search ( `${Todo.CHECKBOX}|${Todo.CHECKMARK}|${Todo.CANCELMARK} ` );

      if ( tokenIndex >= 0 ) {

        const replacement = removeToken ? `${removeToken} ` : '';

        Utils.replace ( cm, lineNr, replacement, tokenIndex, tokenIndex + 2 );

      } else if ( otherIndex >= 0 ) {

        Utils.replace ( cm, lineNr, `${token} `, otherIndex, otherIndex + 2 );

      } else if ( insertToken ) {

        const spaceIndex = Math.max ( line.search ( /\S/ ), 0 );

        Utils.replace ( cm, lineNr, `${insertToken} `, spaceIndex );

      }

    });

  },

  toggleCheckbox ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKBOX, '', Todo.CHECKBOX );

  },

  toggleCheckmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKMARK, Todo.CHECKBOX );

  },

  toggleCancelmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CANCELMARK, Todo.CHECKBOX );

  }

};

/* EXPORT */

export default Todo;
