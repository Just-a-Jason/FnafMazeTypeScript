import { SpriteCategory } from "../../Enums/SpriteCategory";
import { ISprite } from "../../Interfaces/ISprite";

export abstract class AssetsLoader {

    public static async loadSprites(includeWebAssets:boolean=true) {
        const sprites = this.makeRequest('Json/_buildin.json');
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