import { IRenderable } from "../Interfaces/Interfaces.js";
import { LevelSize, SpriteCategory, Sprites } from "../Enums/Enums.js";
import { BasicRendering } from "./BasicRendering.js";
import { SpriteChanger } from "../Enums/Enums.js";
import { Sprite, Vector2 } from "./Structs.js";
import { Game } from "./Game.js";

export class MapEditor implements IRenderable {
    public cursorPosition:Vector2 = new Vector2(this.levelSize*0.5, this.levelSize*0.5);
    public grid:Nullable<Array<Nullable<Sprite>>> = new Array<Nullable<Sprite>>();
    
    private loadedSprites: Array<string> = Object.keys(Sprites);
    private selectedSpriteIdx = 0;
    private pattern:Array<string> = new Array<string>();
    private gridIndex:number = 0;
    public static Instance:Nullable<MapEditor> = null;
    
    public constructor(private game:Game, public levelSize:LevelSize, public rowMaxCells:number = Math.ceil(game.canvasWidth / levelSize)) {
        this.InitGrid(); 
        if (!MapEditor.Instance) MapEditor.Instance = this;
    }
    
    public selectedSprite:Sprite = Sprites.Cupcake;
    
    public GetSpritesArray():Array<Sprite> {
        let spriteArray = new Array<Sprite>();

        for (const key of this.loadedSprites) {
            const sprite:Sprite = Sprites[key as keyof typeof Sprites];

            if(sprite.category === SpriteCategory.GameAsset) continue;
            spriteArray.push(sprite);
        }
        return spriteArray;
    }

    public SetSprite(spriteName:string):void {
        this.selectedSprite = Sprites[spriteName as keyof typeof Sprites];
    }

    private InitGrid():void {
        // rowMaxCells^2
        for (let x = 0; x < this.rowMaxCells; x++) {
            for (let y = 0; y < this.rowMaxCells; y++) {
                if ((x + y) % 2 === 0) {
                    this.pattern.push('#222');
                } else {
                    this.pattern.push('#101314');
                }
                this.grid?.push(null!);
            }
        }
        this.LoadEmptyLevel();
    }

    public PlaceSprite():void {
        this.grid![this.gridIndex] = this.selectedSprite;
    }
    
    public RemoveSprite():void {
        this.grid![this.gridIndex] = null;
    }

    public CalculateGridIndex():void {
        this.gridIndex = Math.floor(this.cursorPosition.x / this.levelSize) + Math.floor(this.cursorPosition.y / this.levelSize)*this.rowMaxCells;
    }

    private LoadEmptyLevel():void {
        this.AddFullRow(0);
        for (let i = 1; i < this.rowMaxCells-1; i++) this.AddBoxedColumn(i);
        this.AddFullRow(this.rowMaxCells-1);
    }
    
    private AddFullRow(y:number):void {
        for (let x = 0; x < this.rowMaxCells; x++) this.grid![x+y*this.rowMaxCells] = Sprites.Wall;
    }

    private AddBoxedColumn(y:number):void {
        const startPosition = y*this.rowMaxCells;
        this.grid![startPosition] = Sprites.Wall;
        this.grid![startPosition+(this.rowMaxCells-1)] = Sprites.Wall;
    }

    public ChangeSprite(change:SpriteChanger):void {
        this.selectedSpriteIdx += change;
        if (this.selectedSpriteIdx > this.loadedSprites.length-1) this.selectedSpriteIdx = 0;
        if (this.selectedSpriteIdx < 0) this.selectedSpriteIdx = this.loadedSprites.length-1;

        const key:string = this.loadedSprites[this.selectedSpriteIdx];
        this.selectedSprite = Sprites[key as keyof typeof Sprites];
    }

    private RenderBackground(ctx:CanvasRenderingContext2D):void {
        this.RenderForeground(ctx);
    }

    private RenderForeground(ctx:CanvasRenderingContext2D):void {

    }

    public Render(ctx:CanvasRenderingContext2D):void {
        const offset:Vector2 = new Vector2(this.levelSize*0.5,this.levelSize * 0.5);
        offset.x -= this.game.mainCamera.position.x;
        offset.y -= this.game.mainCamera.position.y;
        let idx = 0;
        
        for (let x = 0; x < this.rowMaxCells; x++) {
            for (let y = 0; y < this.rowMaxCells; y++) {
                BasicRendering.DrawRectangle(ctx, offset,this.levelSize,this.levelSize, this.pattern[idx]);
                if (this.grid![idx] !== null) {
                    ctx.save();
                    ctx.filter = 'contrast(1.3)';
                    BasicRendering.DrawSprite(ctx, offset, this.grid![idx]!, this.levelSize*this.game.mainCamera.cameraZoomAmount, this.levelSize*this.game.mainCamera.cameraZoomAmount);
                    ctx.restore();
                }
                offset.x += this.levelSize;
                idx++;
            }
            offset.x = this.levelSize * 0.5;
            offset.x -= this.game.mainCamera.position.x;
            offset.y += this.levelSize;
        }
        ctx.save();
            ctx.filter = 'opacity(0.5) contrast(1.3)';
            BasicRendering.DrawSprite(ctx, this.cursorPosition, this.selectedSprite, this.levelSize, this.levelSize);
        ctx.restore();
        BasicRendering.DrawSprite(ctx, this.cursorPosition, Sprites.DashedBG, this.levelSize, this.levelSize);
    }
}