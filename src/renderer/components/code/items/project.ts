
/* PROJECT */

const Project = {

  projectRe: /^(?![^\S\n]*(?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]?\])\s[^\n]*)[^\S\n]*(.+:)[^\S\n]*(?:(?=@[^\s*~(]+(?:\([^)]*\))?)|$)/,

  getTokens () {

    return {
      start: [
        { sol: true, regex: Project.projectRe, token: 'project' }
      ]
    };

  }

};

/* EXPORT */

export default Project;
