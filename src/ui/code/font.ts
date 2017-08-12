
/* IMPORT */

import * as _ from 'lodash';

/* FONT */

const Font = {

  boldRe: /(\*)(.+)(\*)/,
  italicRe: /(_)(.+)(_)/,
  strikethroughRe: /(~)(.+)(~)/,
  boldItalicRe: /(\*_)(.+)(_\*)|(_\*)(.+)(\*_)/,
  boldStrikethroughRe: /(\*~)(.+)(~\*)|(~\*)(.+)(\*~)/,
  italicStrikethroughRe: /(_~)(.+)(~_)|(~_)(.+)(_~)/,
  boldItalicStrikethroughRe: /(\*_~)(.+)(~_\*)|(\*~_)(.+)(_~\*)|(_\*~)(.+)(~\*_)|(_~\*)(.+)(\*~_)|(~_\*)(.+)(\*_~)|(~\*_)(.+)(_\*~)/,

  getTokens () {

    const repeat = ( arr, times ) => _.concat ( [], ..._.range ( times ).map ( () => _.cloneDeep ( arr ) ) ),
          makeTokens = ( classNames, times = 1 ) => {
            const tokens = [`${classNames} font-token`, classNames, `${classNames} font-token`];
            return repeat ( tokens, times );
          };

    return {
      start: [
        { regex: Font.boldItalicStrikethroughRe, token: makeTokens ( 'bold italic strikethrough', 6 ) },
        { regex: Font.boldItalicRe, token: makeTokens ( 'bold italic', 2 ) },
        { regex: Font.boldStrikethroughRe, token: makeTokens ( 'bold strikethrough', 2 ) },
        { regex: Font.italicStrikethroughRe, token: makeTokens ( 'italic strikethrough', 2 ) },
        { regex: Font.boldRe, token: makeTokens ( 'bold' ) },
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

  toggleItalic ( cm ) {

    Font.toggleToken ( cm, '_', '_', 'Italic' );

  },

  toggleStrikethrough ( cm ) {

    Font.toggleToken ( cm, '~', '~', 'Strikethrough' );

  }

};

/* EXPORT */

export default Font;
