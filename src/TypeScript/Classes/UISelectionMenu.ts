import { UIElementFactory } from "./UIElementFactory.js";
import { IDebuggable } from "../Interfaces/Interfaces";
import { SpriteCategory } from "../Enums/Enums";
import { Sprite } from "./Structs";

export class UISelectionMenu implements IDebuggable {
    private categorisedMenuItems: Nullable<Map<SpriteCategory, Sprite[]>> = null;
    private menu: Nullable<Element> = null;
    private selectedElement:number = 0;
    
    public constructor(public sprites:Sprite[]) {
        this.Init();
    }
    
    private Init():void {
        this.menu = document.querySelector('.editModeUI');

        this.ReloadMenu();
    }
    
    
    public ReloadMenu():void {
        if (this.menu) {
            this.Categorize();
            const scrollView:Element = this.menu.querySelector('.scroll-view')!;

            scrollView.innerHTML = '';
    
            if (this.categorisedMenuItems) {
                
                for (let category of this.categorisedMenuItems.keys()) {
                    const sprites:Array<Sprite> = this.categorisedMenuItems.get(category)!;

                    for (const sprite of sprites) {
                        const tsb:UISelectableButton = UIElementFactory.CreateTileSelectableButton(sprite);

                        tsb.addEventListener('click', (e:MouseEvent) => {
                            if ((e.currentTarget as UISelectableButton).classList.contains('selectedTile')) return;

                            const other:Nullable<Element> = document.querySelector('.selectedTile');
                            
                            if (other) other.classList.remove('selectedTile');

                            (e.currentTarget as UISelectableButton).classList.add('selectedTile');
                        });

                        scrollView.appendChild(tsb);
                    }
                }
            }
        }
        else throw new Error('The menu object is not defined.');
    }
    
    private Categorize(){
        const map:Map<SpriteCategory, Sprite[]> = new Map<SpriteCategory, Sprite[]>();
        
        // Clear array first
        if (this.categorisedMenuItems) this.categorisedMenuItems = null;

        for (let sprite of this.sprites) {
            if (!map.has(sprite.category)) map.set(sprite.category, new Array<Sprite>());
            
            map.get(sprite.category)?.push(sprite);
        }
        
        this.categorisedMenuItems = map;
    }

    public Log(): void {
        throw new Error("Not implemented yet.");
    }
}