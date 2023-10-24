import { SpriteCategory } from "../../../Enums/SpriteCategory";
import { ISprite } from "../../../Interfaces/ISprite";
import { Sprite } from "../../../Structs/Sprite";

export class Requests {
    public async loadSprites(includeAssets:boolean=true):Promise<Nullable<Array<Sprite>>> {
        const sprites = await this.makeRequest<ISprite>('Json/_buildin.json');
        if (sprites) {

        }
        return null;
    }

    private async makeRequest<T>(url:string):Promise<Nullable<T>> {
        const response:Response = await fetch(url);

        if (!response.ok) {
            console.error(`Can't make request to: "${url}".\nResponse code: ${response.status}`); 
            return null;
        }

        const data = await response.json();
        if(data satisfies T) {
            return data as T;
        }

        return null;
    }
}