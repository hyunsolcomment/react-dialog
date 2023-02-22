import Position from "./Position";

export default interface DialogHook {
    getVisibility: () => boolean;
    setVisibility: (visible: boolean) => void;
    getPosition: () => Position;
    setPosition: (x: number, y: number) => void;
    setUUID: (uuid: number) => void;
    getUUID: () => number;
}