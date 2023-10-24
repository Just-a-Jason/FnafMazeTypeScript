import { SpriteCategory } from "../Enums/SpriteCategory";


export class Sprite {
    public image: HTMLImageElement;

    public constructor(public readonly name: string, public readonly category: SpriteCategory, private readonly path: string, public readonly width: number, public readonly height: number) {
        const i: HTMLImageElement = new Image();
        i.src = path;

        i.onload = () => {
            this.image = i;
        };

        this.image = i;
    }

    public GetCategory(): string {
        switch (this.category) {
            case SpriteCategory.Character: return 'Characters';
            case SpriteCategory.PlayerSprite: return 'Player Sprites';
            case SpriteCategory.CustomTile: return 'Custom Tiles';
            case SpriteCategory.SolidTile: return 'Solid tiles';
            case SpriteCategory.CollectableItem: return 'Collectable items';
            case SpriteCategory.PowerUp: return 'Powerups';
            case SpriteCategory.Decoration: return "Decorations";
            default: return 'Other';
        }
    }

}
