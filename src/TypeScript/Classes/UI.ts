import { IRenderable } from "../Interfaces/IRenderable";
import { BasicRendering } from "./BasicRendering";
import { Clamp } from "../Scripts/utils";
import { Vector2 } from "../Structs/Vector2";
import { Player } from "./Player";
import { Game } from "./Game";
import { FillAligment } from "../Enums/FillAligment";

export class UI implements IRenderable { 
    private player:Nullable<Player> = null;
    private currentValue = 0;

    public constructor(private game:Game) {}

    public render(ctx:CanvasRenderingContext2D):void {
        if (!this.player) this.player = this.game.findObjectByType(Player);
        else this.DrawPlayerUI(ctx);
        this.game.mainCamera.render(ctx);
        this.DrawFpsCounter(ctx);
    }
    
    private DrawFpsCounter(ctx:CanvasRenderingContext2D) {
        if (this.game.debug) {
            const backgroundPosition:Vector2 = new Vector2(this.game.canvasWidth);
            const backgroundSize:Vector2 = new Vector2(200, 80);
            const fontSize = 20;

            const textPosition:Vector2 = new Vector2(this.game.canvasWidth - backgroundSize.x*0.5 + fontSize*0.5, backgroundSize.y *0.5 - fontSize*0.5);
            BasicRendering.drawRectangle(ctx, backgroundPosition, backgroundSize.x, backgroundSize.y,'#000');
            BasicRendering.drawText(ctx,`FPS: ${this.game.fps}`,textPosition, 80,'#fff', `${fontSize}px 'Press Start 2P', cursive`);
        }
        this.currentValue = Clamp(this.currentValue+this.game.DeltaTime*100, 0, 200);
    }

    private DrawPlayerUI(ctx:CanvasRenderingContext2D) {
        // const width:number = 200;
        // const height:number = 10;
        // const padding:Vector2 = new Vector2(5,5);
        // const fillAmount:number = width * this.player!.getStaminaPercent(); 
        // const barPosition:Vector2 = new Vector2(this.game.canvasWidth - (width + padding.x), this.game.canvasHeight - (height + padding.y));
        
        // const playerInventoryPositionOvarlay:Vector2 = new Vector2(0, this.game.canvasHeight - 60);

        // BasicRendering.DrawRectangle(ctx, playerInventoryPositionOvarlay, this.game.canvasWidth, 60, '#222');
        // BasicRendering.DrawRectangle(ctx, barPosition, width, height, '#000');
        // BasicRendering.DrawRectangle(ctx, barPosition, fillAmount, height, '#48769d');

        // const offset:Vector2 = new Vector2(40, this.game.canvasHeight - 30);
        // const nextSize = 45;
        // for (let i = 0; i < 6; i++) {
        //     BasicRendering.DrawSprite(ctx, offset, Sprites.DashedBG);
        //     offset.x += nextSize;
        // }
    }
}