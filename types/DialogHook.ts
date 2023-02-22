import Position from "./Position";
import SelectActionType from "./SelectActionType";

export default interface DialogHook {
    setVisibility: (visible: boolean) => void;
    getVisibility: () => boolean;
    setPosition: (x: number, y: number) => void;
    getPosition: () => Position;
    setUUID: (uuid: number) => void;
    getUUID: () => number;
}