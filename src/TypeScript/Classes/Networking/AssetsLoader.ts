import { SpriteCategory } from "../../Enums/SpriteCategory";
import { ISprite } from "../../Interfaces/ISprite";
import { Sprite } from "../../Structs/Sprite";

export abstract class AssetsLoader {

    public static async loadSprites(includeWebAssets:boolean=true):Promise<Array<Sprite>> {
        const req = await this.makeRequest('Json/_buildin.json').then(_bundle => _bundle['sprites']);

        const sprites:Array<Sprite> = new Array<Sprite>();

        for (const sprite of req) {
            if (sprite.category === SpriteCategory.GameAsset && !includeWebAssets) continue;
            sprites.push(Sprite.toSpriteObject(sprite));
        }

        return sprites;
    }

    private static async makeRequest(url:string) {
        const response = await fetch(url); 

        if (!response.ok) {
            console.error(`AssetsLoader.makeRequest(url:string)\nCan't fetch: "${url}"`);
            return null;
        };
        return response.json();
    }
}