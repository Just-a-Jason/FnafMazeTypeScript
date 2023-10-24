import { Sprite } from "../Structs/Sprite";
import { Vector2 } from "../Structs/Vector2";

export interface IGameObject {
    referenceName: string;
    position: Vector2;
    sprite?: Sprite;
}