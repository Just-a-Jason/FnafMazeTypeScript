import { Sprites } from "../Enums/Sprites";
import { BasicRendering } from "./BasicRendering";
import { GameObject } from "./GameObject";
import { Sprite } from "./Structs";

export class Obstacle extends GameObject {
    public sprite: Sprite = Sprites.Wall;
    public override Render(ctx: CanvasRenderingContext2D):void {
        BasicRendering.DrawSprite(ctx,this.position,this.sprite);
        BasicRendering.DrawCircle(ctx,this.position,this.collisionRadius, '#f00', 0.5);
    }

    public Main() {
        this.CheckForCollisions();
    }
}