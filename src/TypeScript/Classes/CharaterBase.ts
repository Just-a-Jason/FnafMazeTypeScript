import { ICharacter } from "../Interfaces/Interfaces";
import { BasicRendering } from "./BasicRendering.js";
import { Sprite, Vector2 } from "./Structs.js";
import { GameObject } from "./GameObject.js";

/**
 * Represents a base character in the game world.
 */
export class CharacterBase extends GameObject implements ICharacter {
    public collisionPosition: Vector2 = this.position;
    public speed: number = 100;
    public runSpeed: number = 200;
    public normalSpeed: number = this.speed;

    public fov: number = 200;

    public sprite?: Sprite;

    public Main(): void {
        this.CheckForCollisions();
    }

    public override Render(ctx: CanvasRenderingContext2D): void {        
        if(this.game.debug) BasicRendering.DrawCircle(ctx, this.position, this.fov, "#0f0", 0.3);
        if (this.sprite)  BasicRendering.DrawSprite(ctx, this.position, this.sprite);
    }    
}