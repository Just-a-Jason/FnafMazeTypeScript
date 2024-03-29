import { IRenderable } from "../Interfaces/IRenderable";
import { ICollideable } from "../Interfaces/ICollideable";
import { CharacterBase } from "./CharaterBase";
import { LevelSize } from "../Enums/LevelSize";
import { UISelectionMenu } from "./UISelectionMenu";
import { Vector2 } from "../Structs/Vector2";
import { GameObject } from "./GameObject";
import { MapEditor } from "./MapEditor";
import { Camera } from "./Camera";

export class Game {
    public mapEditor: MapEditor = new MapEditor(this, LevelSize.Small);
    private lastFrameTime: number = performance.now();
    public mainCamera:Camera = new Camera(this, 'Main Camera');
    private renderable: Array<IRenderable> = new Array<IRenderable>();
    public UI:Nullable<IRenderable> = null;
    public editMode:boolean = true;
    public debug:boolean = false;
    public DeltaTime:number = 1;
    public fps = 0;

    public constructor(public canvasWidth:number, public canvasHeight: number) { }
    
    public addObject(obj:IRenderable) {
        this.renderable.push(obj);
    }

    public render(ctx:CanvasRenderingContext2D):void  {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.mainCamera.followPosition();
        this.mapEditor.render(ctx);
        this.processAI();

        this.renderable.forEach((obj:IRenderable) => {
            obj.render(ctx);
        });
        this.UI?.render(ctx);
    }

    private processAI():void {
        this.calculateDeltaTime();
        this.renderable.forEach((renderable:IRenderable) => {
            (renderable as CharacterBase).Main?.();
        });
    }

    public checkForCollision(objectA:ICollideable, objectB:ICollideable): [collision:boolean, distance:number, sumOfRadii:number,objectDistance:Vector2] {
       const objectDistance: Vector2 = Vector2.Distance(Vector2.Add(objectA.collisionPosition, (objectA as GameObject).position), Vector2.Add(objectB.collisionPosition, (objectB as GameObject).position));
       
       const distance:number = Math.hypot(objectDistance.y, objectDistance.x);
       const sumOfRadii:number = objectA.collisionRadius + objectB.collisionRadius;

       return [distance < sumOfRadii, distance, sumOfRadii, objectDistance];
    }

    public findObjectByReferenceName(name:string): Nullable<GameObject> {
            for (let obj of this.renderable) {
                if ((obj instanceof(GameObject))) {
                    if((obj as GameObject).referenceName === name) {
                        return (obj as GameObject);
                    }
                }
            }
            return null;
    } 

    public findObjectsByReferenceName(name:string): Array<GameObject> {
        const objects: Array<GameObject> = new Array<GameObject>();
        
        for (let obj of this.renderable) {
            if ((obj as GameObject).referenceName === name){
                objects.push((obj as GameObject));
            }
        }
        return objects;
    } 

    public findObjectByType<T>(targetType: new (...args: Array<any>) => T, ignoreObject?:T):Nullable<T> {
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

    public findObjectsByType<T>(targetType: new (...args: Array<any>) => T, ignoreObject?:T):Nullable<Array<T>> {
        const found: Array<T> = new Array<T>();
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

    private calculateDeltaTime():void {
        const currentTime:number = performance.now();
        const deltaTime:number = currentTime - this.lastFrameTime;
        this.DeltaTime = deltaTime / 1000;
        this.lastFrameTime = currentTime;

        this.fps = Math.floor(1000 / deltaTime);
    }
}
