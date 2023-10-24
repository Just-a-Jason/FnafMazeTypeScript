import { IRenderable } from "../Interfaces/IRenderable";
import { SpriteCategory } from "../Enums/SpriteCategory";
import { SpriteChanger } from "../Enums/SpriteChanger";
import { UISelectionMenu } from "./UISelectionMenu";
import { BasicRendering } from "./BasicRendering";
import { LevelSize } from "../Enums/LevelSize";
import { Vector2 } from "../Structs/Vector2";
import { Sprites } from "../Enums/Sprites";
import { Sprite } from "../Structs/Sprite";
import { Game } from "./Game";

export class MapEditor implements IRenderable {
    public cursorPosition:Vector2 = new Vector2(this.levelSize*0.5, this.levelSize*0.5);
    public grid:Nullable<Array<Nullable<Sprite>>> = new Array<Nullable<Sprite>>();
    
    private loadedSprites: Array<string> = Object.keys(Sprites);
    private selectedSpriteIdx = 0;
    private pattern:Array<string> = new Array<string>();
    private gridIndex:number = 0;
    private clickAudio:HTMLAudioElement = new Audio('Sounds/Effects/click.ogg');

    public static Instance:Nullable<MapEditor> = null;
    
    public constructor(private game:Game, public levelSize:LevelSize, public rowMaxCells:number = Math.ceil(game.canvasWidth / levelSize)) {
        this.initGrid(); 
        this.clickAudio.volume = 0.5;
        if (!MapEditor.Instance) MapEditor.Instance = this;
    }
    
    public selectedSprite:Sprite = Sprites[this.loadedSprites[0] as keyof typeof Sprites];
    
    public getSpritesArray():Array<Sprite> {
        let spriteArray = new Array<Sprite>();

        for (const key of this.loadedSprites) {
            const sprite:Sprite = Sprites[key as keyof typeof Sprites];

            if(sprite.category === SpriteCategory.GameAsset) continue;
            spriteArray.push(sprite);
        }
        return spriteArray;
    }

    public setSprite(spriteName:string):void {
        this.selectedSprite = Sprites[spriteName as keyof typeof Sprites];
        this.clickAudio.play();
    }

    public setTileButtonAsActive():void {
        const other:Nullable<UISelectableButton> = document.querySelector('.selectedTile');

        other?.classList.remove('selectedTile');

        const btn:UISelectableButton = UISelectionMenu.Instance?.selectableButtons.get(this.selectedSprite)!;
        
        btn.classList.add('selectedTile');
        this.clickAudio.play();
    }

    private initGrid():void {
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
        this.loadEmptyLevel();
    }

    public placeSprite():void {
        this.grid![this.gridIndex] = this.selectedSprite;
    }
    
    public removeSprite():void {
        this.grid![this.gridIndex] = null;
    }

    public calculateGridIndex():void {
        this.gridIndex = Math.floor(this.cursorPosition.x / this.levelSize) + Math.floor(this.cursorPosition.y / this.levelSize)*this.rowMaxCells;
    }

    private loadEmptyLevel():void {
        this.addFullRow(0);
        for (let i = 1; i < this.rowMaxCells-1; i++) this.addBoxedColumn(i);
        this.addFullRow(this.rowMaxCells-1);
    }
    
    private addFullRow(y:number):void {
        for (let x = 0; x < this.rowMaxCells; x++) this.grid![x+y*this.rowMaxCells] = Sprites.Wall;
    }

    private addBoxedColumn(y:number):void {
        const startPosition = y*this.rowMaxCells;
        this.grid![startPosition] = Sprites.Wall;
        this.grid![startPosition+(this.rowMaxCells-1)] = Sprites.Wall;
    }

    public changeSprite(change:SpriteChanger):void {
        this.selectedSpriteIdx += change;
        console.log(this.selectedSpriteIdx);
        if (this.selectedSpriteIdx > this.loadedSprites.length-1) this.selectedSpriteIdx = 0;
        if (this.selectedSpriteIdx < 0) this.selectedSpriteIdx = this.loadedSprites.length-1;

        const key:string = this.loadedSprites[this.selectedSpriteIdx];
        const sprite:Sprite = Sprites[key as keyof typeof Sprites];
        this.selectedSprite = sprite;
        
        //if (this.selectedSprite.category === SpriteCategory.GameAsset) this.changeSprite(SpriteChanger.Next);
        this.setTileButtonAsActive();
    }

    private renderBackground(ctx:CanvasRenderingContext2D):void {
        this.renderForeground(ctx);
    }

    private renderForeground(ctx:CanvasRenderingContext2D):void {

    }

    public render(ctx:CanvasRenderingContext2D):void {
        const offset:Vector2 = new Vector2(this.levelSize*0.5,this.levelSize * 0.5);
        offset.x -= this.game.mainCamera.position.x;
        offset.y -= this.game.mainCamera.position.y;
        let idx = 0;
        
        for (let x = 0; x < this.rowMaxCells; x++) {
            for (let y = 0; y < this.rowMaxCells; y++) {
                BasicRendering.drawRectangle(ctx, offset,this.levelSize,this.levelSize, this.pattern[idx]);
                if (this.grid![idx] !== null) {
                    ctx.save();
                    ctx.filter = 'contrast(1.3)';
                    BasicRendering.drawSprite(ctx, offset, this.grid![idx]!, this.levelSize*this.game.mainCamera.cameraZoomAmount, this.levelSize*this.game.mainCamera.cameraZoomAmount);
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
            BasicRendering.drawSprite(ctx, this.cursorPosition, this.selectedSprite, this.levelSize, this.levelSize);
        ctx.restore();
        const pos = Vector2.copy(this.cursorPosition);
        pos.x -= (10*this.selectedSprite.name.length)/2;
        pos.y += this.levelSize / 1.5;

        BasicRendering.drawText(ctx,this.selectedSprite.name,pos,200,'#fff',"10px 'Press Start 2P', cursive");
        BasicRendering.drawSprite(ctx, this.cursorPosition, Sprites.DashedBG, this.levelSize, this.levelSize);
    }
}