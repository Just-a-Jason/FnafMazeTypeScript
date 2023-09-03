import { IMovable, IRenderable } from "../Interfaces/Interfaces";
import { BasicRendering } from "./BasicRendering.js";
import { Clamp } from "../Scripts/Utils.js";
import { Vector2 } from "./Structs.js";
import { Game } from "./Game.js";

/**
 * Camera class represents movable and zoomable camera object in the game world.
 * @description 
 * To access the main camera object inside game class use:
 * game.mainCamera. It's used to move and zoom level and track player position.
 */
export class Camera implements IMovable, IRenderable {
    public position:Vector2 = new Vector2(); // x:0 y: 0
    public cameraZoomAmountMax:number = 2;
    public cameraZoomAmount:number = 1;
    public smoothing:number = 10;
    public speed:number = 500;
    public id:number = 0;

    public targetPosition:Vector2 = new Vector2();
    private static nextId:number = 0;

    /**
     * 
     * @param game Game reference.
     * @param cameraName A name for this Camera.
     */
    public constructor(private game:Game, private cameraName:string) {
        this.id = Camera.nextId;
        Camera.nextId++;
    }
    
    public Render(ctx:CanvasRenderingContext2D):void {
        if (!this.game.debug) return;

        // Calcuculate camera nameText position:
        const maxWidth:number = 150;
        const fontSize:number = 20;
        const textPosition:Vector2 = new Vector2(fontSize,this.game.canvasHeight - fontSize);
        
        const position:Vector2 = new Vector2(this.game.canvasWidth*0.5, this.game.canvasHeight*0.5);
        BasicRendering.DrawRectangle(ctx,position,this.game.canvasWidth, this.game.canvasHeight, '#f00',0.1);
        BasicRendering.DrawStrokeRect(ctx,position,'#fff',20,this.game.canvasWidth,this.game.canvasHeight,0.5);
        BasicRendering.DrawStrokeRect(ctx,position,'#f00',5,this.game.canvasWidth*0.2, this.game.canvasHeight*0.2,0.5);
        BasicRendering.DrawText(ctx,this.cameraName,textPosition,maxWidth,'#fff',`${fontSize}px 'Press Start 2P', cursive`);
    }

    public FollowTarget(target:IMovable):void {
    }
    
    public FollowPosition() {
        if (!this.targetPosition) return;
        const speed:number = this.game.DeltaTime * this.speed;

        if(this.position.y < this.targetPosition.y) 
            this.position.y += speed;
        
        if (this.position.y > this.targetPosition.y) 
            this.position.y -= speed;
        
        if (this.position.x < this.targetPosition.x)
            this.position.x += speed;

        if (this.position.x > this.targetPosition.x)
            this.position.x -= speed;
        
        console.log(this.position);    
    }
}