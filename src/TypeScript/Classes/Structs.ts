export class Vector2 {
    public constructor(public x:number = 0, public y: number = 0) {}

    public static Distance(v1:Vector2, v2:Vector2): Vector2 {
        return new Vector2(v2.x - v1.x, v2.y - v1.y);
    } 

    public static Add(v1:Vector2, v2:Vector2):Vector2 {
        return new Vector2(v1.x+v2.x, v1.y+v2.y);
    }

    public static Copy(other:Vector2):Vector2 {
        return new Vector2(other.x, other.y);
    }
}

export class Sprite {
    public image: HTMLImageElement;
    public constructor(public name:string, private path:string, public width:number, public height:number) {
        const i: HTMLImageElement = new Image();
        i.src = path;

        i.onload = () => {
            this.image = i;
        };
        
        this.image = i;
    }
}