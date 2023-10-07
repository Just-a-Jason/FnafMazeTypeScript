import { IDebuggable, IUICategoryButton } from "../Interfaces/Interfaces";
import { UIElementFactory } from "./UIElementFactory.js";
import { MapEditor } from "./MapEditor.js";
import { Sprite } from "./Structs";

export class UISelectionMenu implements IDebuggable {
    private categorisedMenuItems: Nullable<Map<string, Array<Sprite>>> = null;
    private menu: Nullable<Element> = null;
    private selectedElement:number = 0;
    
    public constructor(public sprites:Array<Sprite>) {
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
                    const ctgb:IUICategoryButton = UIElementFactory.CreateCategoryButton(category);
                    scrollView.appendChild(ctgb.object);
                    scrollView.appendChild(ctgb.itemList);

                    const sprites:Array<Sprite> = this.categorisedMenuItems.get(category)!;

                    for (const sprite of sprites) {
                        const tsb:UISelectableButton = UIElementFactory.CreateTileSelectableButton(sprite);

                        tsb.addEventListener('click', (e:MouseEvent) => {
                            // Small performance trick
                            const target:UISelectableButton = (e.currentTarget as UISelectableButton);
                            if (target.classList.contains('selectedTile')) return;

                            const other:Nullable<Element> = document.querySelector('.selectedTile');
                            
                            if (other) other.classList.remove('selectedTile');
                            
                            const spriteName:string = target.getAttribute('tile-meta-name')!;

                            MapEditor.Instance?.SetSprite(spriteName);

                            target.classList.add('selectedTile');
                        });

                        ctgb.itemList.appendChild(tsb);
                    }
                }
            }
        }
        else throw new Error('The menu object is not defined.');
    }
    
    private Categorize(){
        const map:Map<string, Array<Sprite>> = new Map<string, Array<Sprite>>();
        
        // Clear array first
        if (this.categorisedMenuItems) this.categorisedMenuItems = null;

        for (let sprite of this.sprites) {
            const category:string = sprite.GetCategory();
            if (!map.has(sprite.GetCategory())) map.set(sprite.GetCategory(), new Array<Sprite>());
            
            map.get(category)?.push(sprite);
        }
        
        this.categorisedMenuItems = map;
    }

    public Log(): void {
        console.log(`All tiles categories count: ${this.categorisedMenuItems?.size}`);
        console.log(this.categorisedMenuItems);
    }
}