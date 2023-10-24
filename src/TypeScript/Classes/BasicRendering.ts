import { FillAligment } from "../Enums/FillAligment";
import { Sprite } from "../Structs/Sprite";
import { Vector2 } from "../Structs/Vector2";


/**
 * BasicRendering class
 * @abstract This class cannot be used as instance by using "new" operator.
 * 
 * @description
 * Provides basic rendering functions like:
 *  - Drawing rectangles, sprites, circles, progress bars.
 *  - It's basictly a helper class to make life easier.
 * @example
 *  import { BasicRendering } from './BasicRendering.js';
 *  import {Sprites} from './Enums.js';
 * 
 *  export class MyGameObject extends GameObject {
 *      public override Render(ctx:CanvasRenderingContext2D):void {
 *          // Let's draw something else here
 *          const spritePosition:Vector2 = new Vector2(100,100); // x: 100, y: 100
 * 
 *          BasicRendering.DrawCircle(ctx,spritePosition,100,'#f00',0.5); // Draws a circle.
 *          BasicRendering.DrawSprite(ctx,spritePosition,Sprites.MySprite,100, 100); // Draws sprite provided.
 *          BasicRendering.DrawSpriteDrawText(ctx,'My Sprite',spritePosition,100); // Draw text with two optional parameters "font?" and "color?".
 *      }
 *  }
 */
export abstract class BasicRendering {
    public static drawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite, targetWidth?:number,targetHeight?:number):void;
    public static drawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite):void; 
    public static drawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite, targetWidth?:number, targetHeight?:number):void  {
        const size: Vector2 = new Vector2(sprite.width, sprite.height);
        if (targetWidth) size.x = targetWidth;
        if (targetHeight) size.y = targetHeight;

        ctx.drawImage(sprite.image, position.x - size.x*0.5, position.y - size.y *0.5, size.x , size.y);
    }

    public static drawRectangle(ctx:CanvasRenderingContext2D, position:Vector2, width:number, height:number, color:string, alpha?:number) {
        ctx.save();
        if (alpha) ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(position.x - width*0.5, position.y - height*0.5, width, height);
        ctx.restore();
    }
    

    public static DrawCircle(ctx:CanvasRenderingContext2D,position:Vector2,radius:number,color:string,alpha?:number):void {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        if(alpha) ctx.globalAlpha = alpha;
        ctx.arc(position.x, position.y, radius, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }

    public static drawText(ctx:CanvasRenderingContext2D,text:string, position:Vector2, maxWidth:number, color:string = '#fff', font?:string):void {
        ctx.save();
        if (font) ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, position.x, position.y, maxWidth);
        ctx.restore();
    }

    public static DrawProgressBar(ctx:CanvasRenderingContext2D, position:Vector2, maximumValue:number, currentValue:number, width:number, height:number, foregroundColor?:string, backgroundColor?:string):void;
    public static DrawProgressBar(ctx:CanvasRenderingContext2D, position:Vector2, maximumValue:number, currentValue:number, width:number, height:number, foregroundColor:string, backgroundColor:string, padding:number, barAligment:FillAligment):void;
    public static DrawProgressBar(ctx:CanvasRenderingContext2D, position:Vector2, maximumValue:number, currentValue:number, width:number, height:number, foregroundColor:string, backgroundColor:string, padding:number):void;
    public static DrawProgressBar(ctx:CanvasRenderingContext2D, position:Vector2, maximumValue:number, currentValue:number, width:number, height:number, foregroundColor:string = '#0f0', backgroundColor:string = '#000', padding:number = 0, barAligment:FillAligment=FillAligment.FromLeftToRight):void {
        /* For Kuguar: 
            Drawing progress bar math rules:
            1. (Fill percent) Divide currentValue by maxValue 
            1a. Example: 
                const maximumValue:number = 200;
                const currentValue:number = 100;
                const fillAmount = currentValue / maximumValue; (0.5)
            
            2. Then you can multiply it by full width to get bar fill amount
            2a. Example:
                const barFullWidth: 200; (200px)
                const barFillAmount = fillAmount*barFullWidth; (100px)
        */  
        let barFillAmount:number = (currentValue / maximumValue)*width;
        
        ctx.save();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(position.x,position.y, width, height);

        ctx.fillStyle = foregroundColor;
        
        // Inner progress bar padding rules
        if (padding > 0) {
            height -= padding;
            position.y += padding*0.5;
            position.x += padding*0.5;
            barFillAmount = (currentValue / maximumValue)*(width-padding);
        }
        
        switch (barAligment) {
            case FillAligment.FromRightToLeft:
                /* 
                   We are increasing bar fill amount from right to left 
                   so we have to move it by full of its width to the right.
                */
                barFillAmount = -barFillAmount;
                position.x += width;
                position.x -= padding;
            break;
        }
        ctx.fillRect(position.x, position.y,barFillAmount,height);
        ctx.restore();
    }    

    public static DrawStrokeRect(ctx:CanvasRenderingContext2D,position:Vector2,lineColor:string,lineWidth:number,width:number,height:number):void;
    public static DrawStrokeRect(ctx:CanvasRenderingContext2D,position:Vector2,lineColor:string,lineWidth:number,width:number,height:number, alpha?:number):void;
    public static DrawStrokeRect(ctx:CanvasRenderingContext2D,position:Vector2,lineColor:string='#fff',lineWidth:number,width:number,height:number,alpha?:number):void {
        ctx.save();
        ctx.beginPath();
        ctx.rect(position.x-(width*0.5),position.y-(height*0.5),width,height);
        ctx.strokeStyle = lineColor;
        if (alpha) ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();        
    }
}
