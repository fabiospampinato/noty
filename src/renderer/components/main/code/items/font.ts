
/* IMPORT */

import * as _ from 'lodash';

/* FONT */

const Font = {

  boldRe: /(\*)([^\n*]+)(\*)/,
  codeRe: /(`)([^\n`]*)(`)/,
  italicRe: /(_)([^\n_]+)(_)/,
  strikethroughRe: /(~)([^\n~]+)(~)/,

  getTokens () {

    const repeat = ( arr, times ) => _.concat ( [], ..._.range ( times ).map ( () => _.cloneDeep ( arr ) ) ),
          makeTokens = ( classNames, times = 1 ) => {
            const tokens = [`${classNames} font-token`, classNames, `${classNames} font-token`];
            return repeat ( tokens, times );
          };

    return {
      start: [
        { regex: Font.boldRe, token: makeTokens ( 'bold' ) },
        { regex: Font.codeRe, token: makeTokens ( 'code' ) },
        { regex: Font.italicRe, token: makeTokens ( 'italic' ) },
        { regex: Font.strikethroughRe, token: makeTokens ( 'strikethrough' ) }
      ]
    };

  },

  toggleToken ( cm, prefix, suffix = prefix, content = '' ) {

    cm.doc.replaceSelections ( cm.doc.getSelections ().map ( selection => {

      const hasToken = selection.slice ( 0, prefix.length ) === prefix && selection.slice ( - suffix.length ) === suffix;

      return hasToken ? selection.slice ( prefix.length, - suffix.length ) : `${prefix}${selection || content}${suffix}`;

    }), 'around' );

  },

  toggleBold ( cm ) {

    Font.toggleToken ( cm, '*', '*', 'Bold' );

  },

  toggleCode ( cm ) {

    Font.toggleToken ( cm, '`', '`', 'Code' );

  },

  toggleItalic ( cm ) {

    Font.toggleToken ( cm, '_', '_', 'Italic' );

  },

  toggleStrikethrough ( cm ) {

    Font.toggleToken ( cm, '~', '~', 'Strikethrough' );

  }

};

/* EXPORT */

export default Font;
