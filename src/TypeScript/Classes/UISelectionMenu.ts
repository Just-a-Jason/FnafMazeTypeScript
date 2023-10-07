import { IDebuggable, IUICategoryButton } from "../Interfaces/Interfaces";
import { UIElementFactory } from "./UIElementFactory.js";
import { MapEditor } from "./MapEditor.js";
import { Sprite } from "./Structs";

export class UISelectionMenu implements IDebuggable {
    private categorisedMenuItems: Map<string, Array<Sprite>> = new Map<string, Array<Sprite>>();
    private menu: Nullable<Element> = null;

    public selectableButtons:Map<Sprite, UISelectableButton> = new Map<Sprite, UISelectableButton>();
    public static Instance:Nullable<UISelectionMenu> = null; 
    
    public constructor(public sprites:Array<Sprite>) {
        this.Init();
    }
    
    private Init():void {
        this.menu = document.querySelector('.editModeUI');

        this.ReloadMenu();
        if (!UISelectionMenu.Instance) UISelectionMenu.Instance = this;
        MapEditor.Instance?.SetTileButtonAsActive();
        document.querySelector('.categoryList')?.classList.add('categoryListActive');
    }
    
    
    public ReloadMenu():void {
        if (this.menu) {
            
            this.Categorize();
            const scrollView:Element = this.menu.querySelector('.scroll-view')!;
            this.selectableButtons.clear();

            scrollView.innerHTML = '';
            
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
                        
                        other?.classList.remove('selectedTile');
                        
                        const spriteName:string = target.getAttribute('tile-meta-name')!;

                        MapEditor.Instance?.SetSprite(spriteName);

                        target.classList.add('selectedTile');

                    });

                    this.selectableButtons.set(sprite, tsb);

                    ctgb.itemList.appendChild(tsb);
                }
            }
        }
        else throw new Error('The menu object is not defined.');
    }
    
    private Categorize(){
        const map:Map<string, Array<Sprite>> = new Map<string, Array<Sprite>>();
        this.categorisedMenuItems.clear();

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