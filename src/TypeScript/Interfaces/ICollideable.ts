import { Vector2 } from "../Structs/Vector2";

export interface ICollideable {
    collisionPosition: Vector2;
    collisionEnabled: boolean;
    collisionRadius: number;
    CheckForCollisions(): void;
}
