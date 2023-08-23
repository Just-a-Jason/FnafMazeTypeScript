import { ICollideable, IRenderable } from "../Interfaces/Interfaces.js";
import { MapEditor } from "./MapEditor.js";
import { CharacterBase } from "./CharaterBase.js";
import { GameObject } from "./GameObject.js";
import { Vector2 } from "./Structs.js";
import { Mouse } from "./Mouse.js";
import { LevelSize } from "../Enums/Enums.js";

export class Game {
    public mapEditor: MapEditor = new MapEditor(this, LevelSize.Small);
    private lastFrameTime: number = performance.now();
    private renderable: IRenderable[] = [];
    public UI: IRenderable | null = null;
    public mouse: Mouse = new Mouse();
    public editMode:boolean = true;
    public debug:boolean = true;
    public DeltaTime:number = 1;
    public fps = 0;
    
    public constructor(public canvasWidth:number, public canvasHeight: number) { }
    
    public Add(obj:IRenderable) {
        this.renderable.push(obj)
    }

    public Render(ctx:CanvasRenderingContext2D):void  {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.mapEditor.Render(ctx);
        this.mouse.Render(ctx);       
        this.ProcessAI();

        this.renderable.forEach((obj:IRenderable) => {
            obj.Render(ctx);
        });
        this.UI?.Render(ctx);
    }

    private ProcessAI():void {
        this.CalculateDeltaTime();
        this.renderable.forEach((renderable:IRenderable) => {
            (renderable as CharacterBase).Main?.();
        });
    }

    public CheckForCollision(objectA:ICollideable, objectB:ICollideable): [collision:boolean, distance:number, sumOfRadii:number,objectDistance:Vector2] {
       const objectDistance: Vector2 = Vector2.Distance(Vector2.Add(objectA.collisionPosition, (objectA as GameObject).position), Vector2.Add(objectB.collisionPosition, (objectB as GameObject).position));
       
       const distance:number = Math.hypot(objectDistance.y, objectDistance.x);
       const sumOfRadii:number = objectA.collisionRadius + objectB.collisionRadius;

       return [distance < sumOfRadii, distance, sumOfRadii, objectDistance];
    }

    public FindObjectByReferenceName(name:string): null | GameObject {
            for (let obj of this.renderable) {
                if ((obj instanceof(GameObject))) {
                    if((obj as GameObject).referenceName === name) {
                        return (obj as GameObject);
                    }
                }
            }
            return null;
    } 

    public FindObjectsByReferenceName(name:string): GameObject[] {
        const objects: GameObject[] = [];
        
        for (let obj of this.renderable) {
            if ((obj as GameObject).referenceName === name){
                objects.push((obj as GameObject));
            }
        }
        return objects;
    } 

    public FindObjectByType<T>(targetType: new (...args: any[]) => T, ignoreObject?:T): T | null {
        for (const obj of this.renderable) {
            if(obj === ignoreObject) continue;
            if (obj instanceof targetType) {
                if (obj satisfies T) {
                    return obj as T;
                }
            }
        }
        return null;
    }

    public FindObjectsByType<T>(targetType: new (...args: any[]) => T, ignoreObject?:T): T[] | null {
        const found: T[] = [];
        for (const obj of this.renderable) {
            if (obj === ignoreObject) continue;
            if (obj instanceof targetType) {
                if (obj satisfies T) {
                    found.push(obj as T);
                }
            }
        }
        return (found.length > 0) ? found : null;
    }

    private CalculateDeltaTime(): void {
        const currentTime:number = performance.now();
        const deltaTime:number = currentTime - this.lastFrameTime;
        this.DeltaTime = deltaTime / 1000;
        this.lastFrameTime = currentTime;

        this.fps = Math.floor(1000 / deltaTime);
    }
}