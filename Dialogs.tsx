import { ReactNode } from 'react';
import { DialogEventHandler } from './DialogEventHandler';
import './dialog.css';

DialogEventHandler();

function Dialogs({ children }:{ children: ReactNode } ) {
    return (
        <div id="react-dialog_dialogs">
            { children }
        </div>
    )
}

export default Dialogs;