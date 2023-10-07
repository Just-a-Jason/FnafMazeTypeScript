import { Sprite, Vector2 } from "../Classes/Structs";
import { GameObject } from "../Classes/GameObject";

export interface IGameObject {
    referenceName: string;
    position: Vector2;
    sprite?: Sprite;
}

export interface ICollideable {
    collisionPosition: Vector2;
    collisionEnabled: boolean;
    collisionRadius: number;
    CheckForCollisions():void;
}

export interface IRenderable {
    Render(ctx: CanvasRenderingContext2D):void;
}

export interface IMovable {
    position: Vector2;
}

export interface ICharacter {
    Main():void;
    normalSpeed: number;
    runSpeed: number;
    speed: number;
    fov: number;
}

export interface IDebuggable {
    Log():void;
}

export interface IWander {
    targetPosition?: Vector2;
    Wander():void;
}

export interface IChaser {
    target?:Nullable<GameObject>;
    maxEscapeZone: number;
    chaseSpeed?: number;
    isChaseing:boolean;
    Chase():void;
}

export interface IUICategoryButton {
    object:UICategoryButton;
    itemList:CategoryList;
}