import {useState,useEffect} from 'react';
import { DialogSelect } from './DialogEventHandler';
import DialogGlobal from "./DialogGlobal";
import DialogHook from './types/DialogHook';
import SelectActionType from './types/SelectActionType';

function Dialog({ id, className, dialog, selectAction, children }: { uuid?: number, id?: string, className?: string, dialog: DialogHook, selectAction?: SelectActionType, children?: React.ReactNode}) {
    const classNames = className ? className.split(" ").toString().replaceAll(",", " ") : "";

    const [dialogEl, setDialogEl] = useState<HTMLDivElement | null>();

    useEffect(() => {

        if(dialogEl) {

            dialogEl.onmousedown = (e: MouseEvent) => {
                const target = e.target as HTMLElement;

                let isSelect: boolean = false;
                
                switch(selectAction ?? SelectActionType.CLICK_SELECT_POINT) {
                    case SelectActionType.CLICK_SELECT_POINT:
                        isSelect = target.className.includes("select-point");
                        break;

                    case SelectActionType.CLICK:
                        isSelect = true;
                        break;

                    case SelectActionType.CLICK_NOT_SELECT_POINT:
                        isSelect = !target.className.includes("select-point");
                        break;

                    case SelectActionType.NONE:
                        return false;
                }

                if(isSelect)
                    DialogSelect(e, dialogEl);
            }

            const lastPos = DialogGlobal.getLastPosition(dialog.getUUID());

            if(lastPos) {
                dialogEl.style.left = lastPos.x+"px";
                dialogEl.style.top  = lastPos.y+"px";
            }
        }

    },[dialogEl])

    const visibility = dialog.getVisibility();

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