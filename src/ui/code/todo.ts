
/* IMPORT */

import Utils from './utils';

/* TODO */

const Todo = {

  CHECKBOX: '☐',
  CHECKMARK: '✔',
  CANCELMARK: '✘',

  projectRe: /^(?![^\S\n]*☐[^\n@]*)(.+:[^\S\n]*)(?:(?=@)|$)/,
  doneRe: /^([^\S\n]*✔[^\n@]*)/,
  cancelRe: /^([^\S\n]*✘[^\n@]*)/,

  getTokens () {

    return {
      start: [
        { regex: Todo.projectRe, token: 'todo-project' },
        { regex: Todo.doneRe, token: 'todo-done' },
        { regex: Todo.cancelRe, token: 'todo-cancel' }
      ]
    };

  },

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

        let spaceIndex = line.search ( /\S/ );

        if ( spaceIndex === -1 ) spaceIndex = line.length;

        Utils.replace ( cm, lineNr, `${insertToken} `, spaceIndex );

      }

    });

  },

  toggleCheckbox ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKBOX, '', Todo.CHECKBOX );

  },

  toggleCheckmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKMARK, Todo.CHECKBOX, Todo.CHECKMARK );

  },

  toggleCancelmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CANCELMARK, Todo.CHECKBOX, Todo.CANCELMARK );

  }

};

/* EXPORT */

export default Todo;
