import { SpriteCategory } from "../Enums/SpriteCategory";

export interface ISprite {
    category:SpriteCategory;
    height:number;
    width:number;
    name:string;
    path:string;
}