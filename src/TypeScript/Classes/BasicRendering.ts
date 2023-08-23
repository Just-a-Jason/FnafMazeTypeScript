import { Sprite, Vector2 } from "./Structs.js";

export abstract class BasicRendering {
    public static DrawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite, targetWidth?:number,targetHeight?:number):void;
    public static DrawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite):void; 
    public static DrawSprite(ctx:CanvasRenderingContext2D, position:Vector2, sprite:Sprite, targetWidth?:number, targetHeight?:number):void  {
        const size: Vector2 = new Vector2(sprite.width, sprite.height);
        if (targetWidth) size.x = targetWidth;
        if (targetHeight) size.y = targetHeight;

        ctx.drawImage(sprite.image, position.x - size.x*0.5, position.y - size.y *0.5, size.x , size.y);
    }

    public static DrawRectangle(ctx:CanvasRenderingContext2D, position:Vector2, width:number, height:number, color:string, alpha?:number) {
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

    public static DrawText(ctx:CanvasRenderingContext2D,text:string, position:Vector2, maxWidth:number, color:string = '#fff', font?:string):void {
        ctx.save();
        if (font) ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, position.x, position.y, maxWidth);
        ctx.restore();
    }
}
