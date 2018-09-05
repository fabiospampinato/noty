
/* TAG */

const Tag = {

  tagRe: /(?:^|[^a-zA-Z0-9`])(@[^\s*~(]+(?:\([^)]*\))?)/,

  getTokens () {

    return {
      start: [
        { regex: Tag.tagRe, token: 'tag' }
      ]
    };

  }

};

/* EXPORT */

export default Tag;
