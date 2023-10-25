import { IRenderable } from "../Interfaces/IRenderable";
import { IMovable } from "../Interfaces/IMovable";
import { BasicRendering } from "./BasicRendering";
import { Vector2 } from "../Structs/Vector2";
import { Game } from "./Game";

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
    public readonly id:number = 0;
    public speed:number = 500;

    public targetPosition:Vector2 = new Vector2();
    private static nextId:number = 0;

    /**
     * 
     * @param game Game reference.
     * @param cameraName A name for this Camera.
     */
    public constructor(private game:Game, private cameraName:string) {
        this.id = Camera.nextId++;
    }
    
    public render(ctx:CanvasRenderingContext2D):void {
        if (!this.game.debug) return;

        // Calcuculate camera nameText position:
        const maxWidth:number = 150;
        const fontSize:number = 20;
        const textPosition:Vector2 = new Vector2(fontSize,this.game.canvasHeight - fontSize);
        
        const position:Vector2 = new Vector2(this.game.canvasWidth*0.5, this.game.canvasHeight*0.5);
        BasicRendering.drawRectangle(ctx,position,this.game.canvasWidth, this.game.canvasHeight, '#f00',0.1);
        BasicRendering.DrawStrokeRect(ctx,position,'#fff',20,this.game.canvasWidth,this.game.canvasHeight,0.5);
        BasicRendering.DrawStrokeRect(ctx,position,'#f00',5,this.game.canvasWidth*0.2, this.game.canvasHeight*0.2,0.5);
        BasicRendering.drawText(ctx,this.cameraName,textPosition,maxWidth,'#fff',`${fontSize}px 'Press Start 2P', cursive`);
    }

    public followTarget(target:IMovable):void {
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
    }
}