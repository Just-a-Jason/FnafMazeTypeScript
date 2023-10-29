import { IRenderable } from "../Interfaces/IRenderable";

export class Layer {
    public items:Array<IRenderable> = [];
    private static ID:number = 0;
    
    public constructor(public readonly id:number = Layer.ID++) {}
}