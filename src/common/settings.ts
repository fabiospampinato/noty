
/* IMPORT */

import * as Store from 'electron-store';
import pkg from '@root/package.json';

/* SETTINGS */

const Settings = new Store ({
  defaults: {
    note: pkg.productName,
    notes: [
      {
        title: pkg.productName,
        content: `Welcome to ${pkg.productName}\n\nSince we are using the FiraCode font you can type many glyphs like: -> ->> => ==> ~~> <-< <=< |> <| <>\n\nWe support To-Do lists by default:\n  ✔ Read the readme\n  ☐ Star the repository\n  ☐ Share with friends\n\nLinks: www.example.com\n\nFont styles: *Bold*, _Italic_ and ~Strikethrough~\n\nAnd multiple notes, try clicking the title to switch note.`
      },
      {
        title: 'Another note',
        content: 'Pretty cool, huh?'
      }
    ]
  }
});

/* EXPORT */

export default Settings;
