import { IMovable } from "../Interfaces/Interfaces";
import { Vector2 } from "./Structs.js";

export class Camera implements IMovable {
    public position:Vector2 = new Vector2();
    public cameraZoomAmount:number = 1;
    public cameraZoomAmountMax:number = 2;
    public speed:number =  700;
}