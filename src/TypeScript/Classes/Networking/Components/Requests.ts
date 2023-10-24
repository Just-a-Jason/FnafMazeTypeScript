import { SpriteCategory } from "../../../Enums/SpriteCategory";
import { Sprite } from "../../../Structs/Sprite";

class Requests {
    public loadSprites(includeAssets:boolean=true):Nullable<Array<Sprite>> {
        if ()
        return null;
    }

    private async makeRequest(url:string, method:FetchMethod='GET'):Promise<string> {
        await fetch(url, {
            headers: {
                "method": method,
                "Content-Type": "application/json",
            }
        })
    }
}