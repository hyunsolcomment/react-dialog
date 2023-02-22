import DialogGlobal from "./DialogGlobal";
import Position from "./types/Position";

let selected: HTMLElement | null;
let _shift: Position = { x:0, y:0 };

export function DialogSelect(e: MouseEvent, element: HTMLElement) {

    _shift = {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top
    }

    if(element.className.includes("select-point")) {
        if(element.parentElement?.className.includes("react-dialog_dialog")) {
            selected = element.parentElement;
        }
    }

    else if(element.className.includes("react-dialog_dialog")) {
        selected = element;
    }

    if(selected)
        DialogFocus(selected);
}

export function DialogFocus(element: HTMLElement) {
    const dialogs = document.getElementById("react-dialog_dialogs");
    const uuid = element.getAttribute("data-dialog-uuid");

    if(!dialogs) {
        console.error("<Dialogs> 태그가 작성되지 않은 것 같습니다.");
        return;
    }

    if(!uuid) {
        console.error("focus하려는 태그가 Dialog가 아닌 것 같습니다.");
        return;
    }

    if(uuid && dialogs) {

        element.style.zIndex = '999';

        for(var el of dialogs.children) {
            if(el !== element) {
                (el as HTMLElement).style.zIndex = '998';
            }
        }
    }
}

export function DialogEventHandler() {

    window.onload = () => {
        
        window.onmousemove = (e: MouseEvent) => {
            if(selected) {
                selected.style.left = (e.clientX - _shift.x)+"px";
                selected.style.top  = (e.clientY - _shift.y)+"px";
            }
        }
        
        window.onmouseup = (e: MouseEvent) => {
            if(selected) {
                    
                // 마지막 위치 저장
                const uuidStr = selected.getAttribute("data-dialog-uuid");

                if(uuidStr) {
                    const uuid = parseInt(uuidStr);
                    DialogGlobal.setLastPosition(uuid, {x: selected.getBoundingClientRect().left, y: selected.getBoundingClientRect().top});
                }

                selected = null;
            }
        }
    }
}