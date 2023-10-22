import { ICollideable, IGameObject, IRenderable } from "../Interfaces/interfaces";
import { BasicRendering } from "./BasicRendering";
import { Sprite, Vector2 } from "./Structs";
import { Game } from "./Game";

export class GameObject implements IGameObject, IRenderable, ICollideable {
    public collisionPosition: Vector2 = new Vector2();
    public collisionEnabled: boolean = true;
    public collisionRadius: number = 30;
    public referenceName: string;
    public position: Vector2;
    public sprite?: Sprite;

    public constructor(position: Vector2 = new Vector2(), referenceName: string, protected game: Game) {
        this.referenceName = referenceName;
        this.position = position;
    }
    
    public CheckForCollisions():void {
    }

    public Render(ctx:CanvasRenderingContext2D):void {
        if (this.game.debug) BasicRendering.DrawCircle(ctx,this.position,this.collisionRadius, '#f00', 0.5);
        if (this.sprite) BasicRendering.DrawSprite(ctx, this.position, this.sprite);
    }
}