import { IRenderable } from "../Interfaces/IRenderable";
import { ICollideable } from "../Interfaces/ICollideable";
import { IGameObject } from "../Interfaces/IGameObject";
import { BasicRendering } from "./BasicRendering";
import { Sprite } from "../Structs/Sprite";
import { Vector2 } from "../Structs/Vector2";
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

    public render(ctx:CanvasRenderingContext2D):void {
        if (this.game.debug) BasicRendering.DrawCircle(ctx,this.position,this.collisionRadius, '#f00', 0.5);
        if (this.sprite) BasicRendering.drawSprite(ctx, this.position, this.sprite);
    }
}