
/* IMPORT */

import * as $ from 'cash-dom';
import {Editor as EditorType} from 'codemirror';
import {Container} from 'overstated';

/* EDITOR */

class Editor extends Container<EditorState, MainCTX> {

  /* STATE */

  state = {
    editor: undefined as EditorType | undefined,
    scroll: false
  };

  /* API */

  get = (): EditorType | undefined => {

    return this.state.editor;

  }

  set = ( editor: EditorType ) => {

    return this.setState ({ editor });

  }

  reset = () => {

    const editor = this.ctx.editor.get ();

    if ( editor ) {
      editor['focus']();
      editor['setSelection']({ line: 0, ch: 0 });
      editor['doc'].clearHistory ();
    }

    const $scroll = $('.CodeMirror-scroll');

    if ( $scroll.length ) {
      $scroll[0].scrollTop = 0;
    }

  }

  dialog = ( label: string, options? ): Promise<string | undefined> => {

    return new Promise ( res => {

      const editor = this.get ();

      if ( !editor ) return res ();

      const template = `<span class="CodeMirror-search-label">${label}</span> <input type="text" class="CodeMirror-search-field" />`;

      editor['openDialog']( template, res, options );

    });

  }

  isScroll = (): boolean => {

    return this.state.scroll;

  }

  setScroll = ( scroll ) => {

    return this.setState ({ scroll });

  }

  onScroll = ( editor, {top} ) => {

    const isScroll = !!top;

    if ( this.isScroll () === isScroll ) return;

    this.setScroll ( isScroll );

  }

}

/* EXPORT */

export default Editor;
