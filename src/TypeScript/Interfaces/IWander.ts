import { Vector2 } from "../Structs/Vector2";

export interface IWander {
    targetPosition?: Vector2;
    Wander(): void;
}