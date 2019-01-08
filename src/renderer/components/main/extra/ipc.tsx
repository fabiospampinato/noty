
/* IMPORT */

import {ipcRenderer as ipc} from 'electron';
import {connect} from 'overstated';
import {Component} from 'react-component-renderless';
import Main from '@renderer/containers/main';

/* IPC */

class IPC extends Component<{ container: IMain}, undefined> {

  /* SPECIAL */

  componentDidMount () {

    ipc.on ( 'note-add', this.__noteAdd );
    ipc.on ( 'note-rename', this.__noteRename );
    ipc.on ( 'note-delete', this.__noteDelete );
    ipc.on ( 'note-select-number', this.__noteSelectNumber );
    ipc.on ( 'note-select-previous', this.__noteSelectPrevious );
    ipc.on ( 'note-select-next', this.__noteSelectNext );
    ipc.on ( 'window-focus', this.__windowFocus );
    ipc.on ( 'window-blur', this.__windowBlur );

  }

  componentWillUnmount () {

    ipc.removeListener ( 'note-add', this.__noteAdd );
    ipc.removeListener ( 'note-rename', this.__noteRename );
    ipc.removeListener ( 'note-delete', this.__noteDelete );
    ipc.removeListener ( 'note-select-number', this.__noteSelectNumber );
    ipc.removeListener ( 'note-select-previous', this.__noteSelectPrevious );
    ipc.removeListener ( 'note-select-next', this.__noteSelectNext );
    ipc.removeListener ( 'window-focus', this.__windowFocus );
    ipc.removeListener ( 'window-blur', this.__windowBlur );

  }

  /* HANDLERS */

  __noteAdd = () => {

    this.props.container.note.add ();

  }

  __noteRename = () => {

    this.props.container.note.rename ();

  }

  __noteDelete = () => {

    this.props.container.note.delete ();

  }

  __noteSelectNumber = ( event, nr: number ) => {

    this.props.container.note.selectNumber ( nr );

  }

  __noteSelectPrevious = () => {

    this.props.container.note.selectPrevious ();

  }

  __noteSelectNext = () => {

    this.props.container.note.selectNext ();

  }

  __windowFocus = () => {

    this.props.container.window.setFocus ( true );

  }

  __windowBlur = () => {

    this.props.container.window.setFocus ( false );

  }

}

/* EXPORT */

export default connect ({
  container: Main,
  shouldComponentUpdate: false
})( IPC );
