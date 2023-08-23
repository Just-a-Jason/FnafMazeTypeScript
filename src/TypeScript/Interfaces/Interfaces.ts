import { GameObject } from "../Classes/GameObject.js";
import { Sprite, Vector2 } from "../Classes/Structs.js";

/**
 * Represents a game object with optional collision properties.
 */
export interface IGameObject {
    /**
     * The position of the game object.
     */
    position: Vector2;

    /**
     * The sprite associated with the game object.
     */
    sprite?: Sprite;

    /**
     * The name of the game object.
     */
    referenceName: string;
}

/**
 * Represents an object that can participate in collision detection.
 */
export interface ICollideable {
    /**
     * The position for collision detection.
     */
    collisionPosition: Vector2;

    /**
     * Indicates whether collision detection is enabled.
     */
    collisionEnabled: boolean;

    /**
     * The collision radius for collision detection.
     */
    collisionRadius: number;
    CheckForCollisions():void;
}

/**
 * Represents an object that can be rendered on a canvas.
 */
export interface IRenderable {
    /**
     * Renders the object on the canvas context.
     * @param ctx The canvas rendering context.
     */
    Render(ctx: CanvasRenderingContext2D): void;
}

/**
 * Represents an object that can be moved to a specific position.
 */
export interface IMovable {
    /**
     * The current position of the movable object.
     */
    position: Vector2;
}

export interface ICharacter {
    Main(): void;
    normalSpeed: number;
    runSpeed: number;
    speed: number;
    fov: number;
}

/**
 * Represents an object that provides debugging capabilities.
 */
export interface IDebuggable {
    /**
     * Logs debugging information for the object.
     */
    Log(): void;
}

/**
 * Represents an object with wandering behavior.
 */
export interface IWander {
    /**
     * The target position for wandering.
     */
    targetPosition?: Vector2;

    /**
     * Executes the wandering behavior.
     */
    Wander(): void;
}

/**
 * Represents an object with chasing behavior.
 */
export interface IChaser {
    /**
     * The target object to chase.
     */
    target?: GameObject | null;
    maxEscapeZone: number;
    chaseSpeed?: number;
    isChaseing:boolean;

    /**
     * Chase the specified movable object.
     * @param other The movable object to chase.
     */
    Chase(): void;
}
