import { IMovable, IRenderable } from "../Interfaces/Interfaces";
import { BasicRendering } from "./BasicRendering.js";
import { Vector2 } from "./Structs.js";

export class Mouse implements IMovable, IRenderable {
    public position: Vector2 = new Vector2();
    public pressed: boolean = false;
    
    public Render(ctx: CanvasRenderingContext2D): void {
    //    BasicRendering.DrawCircle(ctx,this.position,30,'orange',0.5);
    }
}