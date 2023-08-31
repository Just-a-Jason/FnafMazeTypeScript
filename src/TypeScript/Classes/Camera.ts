import { IMovable, IRenderable } from "../Interfaces/Interfaces";
import { Vector2 } from "./Structs.js";
import { Game } from "./Game.js";

/**
 * Camera class represents movable and zoomable camera object in the game world.
 * @description 
 * To access the main camera object inside game class use:
 * game.mainCamera. It's used to move and zoom level and track player position.
 */
export class Camera implements IMovable, IRenderable {
    public position:Vector2 = new Vector2(); // x:0 y: 0
    public cameraZoomAmountMax:number = 2;
    public cameraZoomAmount:number = 1;
    public speed:number =  700;

    
    private target?:Nullable<IMovable> = null;

    public constructor(private game:Game) {}
    

    public Render(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }

    public FollowTarget(target:IMovable):void {

    }
}