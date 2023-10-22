import { ICharacter } from "../Interfaces/interfaces";
import { Sprite, Vector2 } from "./Structs";
import { GameObject } from "./GameObject";

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

    public Main():void {
        this.CheckForCollisions();
    }
}