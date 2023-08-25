import { IRenderable } from "../Interfaces/Interfaces";
import { BasicRendering } from "./BasicRendering.js";
import { Vector2 } from "./Structs.js";
export class mouse implements IRenderable{
    public position:Vector2 = new Vector2();
    Render(ctx: CanvasRenderingContext2D): void {
        BasicRendering.DrawRectangle(ctx,this.position,50,70,"red")
    }

}