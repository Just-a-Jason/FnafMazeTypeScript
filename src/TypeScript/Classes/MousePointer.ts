import { SpriteCategory } from "../Enums/SpriteCategory";
import { IRenderable } from "../Interfaces/IRenderable";
import { Sprite } from "../Structs/Sprite";
import { Vector2 } from "../Structs/Vector2";
import { BasicRendering } from "./BasicRendering";

export default class MousePointer implements IRenderable {
    constructor
    (public position:Vector2 = new Vector2(), 
    private sprite:Sprite = new Sprite('kursor myszy', SpriteCategory.GameAsset, 'kursor.png', 200, 300)) {

    }

    render(ctx: CanvasRenderingContext2D): void {
        BasicRendering.drawSprite(ctx, this.position,this.sprite);
    }

    public setPosition(e:MouseEvent) {
        this.position.x = e.offsetX;
        this.position.y = e.offsetY;
    }
}