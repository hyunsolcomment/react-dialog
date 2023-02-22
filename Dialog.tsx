import DialogHook from "./types/DialogHook";
import {useState,useEffect} from 'react';
import DialogGlobal, { lastPositionMap } from "./DialogGlobal";

function Dialog({ id, className, dialog, children }: { uuid?: number, id?: string, className?: string, dialog: DialogHook, children?: React.ReactNode}) {
    const classNames = className ? className.split(" ").toString().replaceAll(",", " ") : "";
    const visibility = dialog.getVisibility();

    const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>();

    useEffect(() => {

        if(dialogEl) {
            const lastPos = DialogGlobal.getLastPosition(dialog.getUUID());

            if(lastPos) {
                dialogEl.style.left = lastPos.x+"px";
                dialogEl.style.top  = lastPos.y+"px";
            }
        }

    },[dialogEl])

    if(!visibility) return null;

    return (
        <div className={"react-dialog_dialog"+classNames} ref={ref => setDialogEl(ref)} data-dialog-uuid={dialog.getUUID()}>
            <div className="select-point">
                <button className="close-btn" onClick={ () => dialog.setVisibility(false) }>X</button>
            </div>

            { children }
        </div>
    )
}

export default Dialog;