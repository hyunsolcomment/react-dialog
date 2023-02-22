import Position from "./types/Position";

export let lastPositionMap: Map<number, Position> = new Map<number, Position>();

const DialogGlobal = {
    isUsedUUID: (uuid: string) => {
        for(let el of document.getElementsByTagName("div")) {
            const _uuid = el.getAttribute("data-dialog-uuid");

            if(_uuid === uuid) return true;
        }

        return false;
    },
    setLastPosition: (uuid: number, position: Position) => lastPositionMap.set(uuid, position),
    getLastPosition: (uuid: number) => lastPositionMap.get(uuid) ?? {x:0, y:0}
}

export default DialogGlobal;