import DialogHook from "./types/DialogHook";
import {useState,useEffect} from 'react';
import Position from "./types/Position";
import DialogGlobal from "./DialogGlobal";

function useDialog(): DialogHook {
    
    const [ visibility, setVisibility ] = useState<boolean>(false);
    const [ position, setPosition ]     = useState<Position>({x: 0, y:0 });
    const [ uuid, setUUID ]             = useState<number | null>(null);

    if(uuid === null) {
        while(uuid === null) {

            let _tmpUUID = Math.floor(Math.random() * 10000) + 1;
            
            if(!DialogGlobal.isUsedUUID(_tmpUUID.toString())) {
                setUUID(Math.floor(_tmpUUID));
                break;
            }
        }
    }

    const dialogCallback: DialogHook = {
        setVisibility: (visible: boolean) => { setVisibility(visible) },
        getVisibility: () => visibility,
        setPosition: (x: number, y: number) => { setPosition({x:x,y:y}) },
        getPosition: () => position,
        setUUID: (uuid: number) => setUUID(uuid),
        getUUID: () => uuid ?? -1
    }

    return dialogCallback;
}

export default useDialog;