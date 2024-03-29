import { IUICategoryButton } from "../Interfaces/IUICategoryButton";
import { IDebuggable } from "../Interfaces/IDebuggable";
import { UIElementFactory } from "./UIElementFactory";
import { MapEditor } from "./MapEditor";
import { Sprite } from "../Structs/Sprite";

export class UISelectionMenu implements IDebuggable {
    private categorisedMenuItems: Map<string, Array<Sprite>> = new Map<string, Array<Sprite>>();
    private menu: Nullable<Element> = null;

    public selectableButtons:Map<Sprite, UISelectableButton> = new Map<Sprite, UISelectableButton>();
    public static Instance:Nullable<UISelectionMenu> = null; 
    
    public constructor(public sprites:Array<Sprite>) {
        this.init();
    }
    
    private init():void {
        this.menu = document.querySelector('.editModeUI');

        this.reloadMenu();
        if (!UISelectionMenu.Instance) UISelectionMenu.Instance = this;
        MapEditor.Instance?.setTileButtonAsActive();
        document.querySelector('.categoryList')?.classList.add('categoryListActive');
    }
    
    
    public reloadMenu():void {
        if (this.menu) {
            
            this.categorize();
            const scrollView:Element = this.menu.querySelector('.scroll-view')!;
            this.selectableButtons.clear();

            scrollView.innerHTML = '';
            
            for (let category of this.categorisedMenuItems.keys()) {
                const ctgb:IUICategoryButton = UIElementFactory.createCategoryButton(category);
                scrollView.appendChild(ctgb.object);
                scrollView.appendChild(ctgb.itemList);

                const sprites:Array<Sprite> = this.categorisedMenuItems.get(category)!;

                for (const sprite of sprites) {
                    const tsb:UISelectableButton = UIElementFactory.createTileSelectableButton(sprite);

                    tsb.addEventListener('click', (e:MouseEvent) => {
                        // Small performance trick
                        const target:UISelectableButton = (e.currentTarget as UISelectableButton);
                        if (target.classList.contains('selectedTile')) return;

                        const other:Nullable<Element> = document.querySelector('.selectedTile');
                        
                        other?.classList.remove('selectedTile');
                        
                        const spriteName:string = target.getAttribute('tile-meta-name')!;

                        MapEditor.Instance?.setSprite(spriteName);

                        target.classList.add('selectedTile');
                    });

                    this.selectableButtons.set(sprite, tsb);

                    ctgb.itemList.appendChild(tsb);
                }
            }
        }
        else throw new Error('The menu object is not defined.');
    }
    
    private categorize(){
        const map:Map<string, Array<Sprite>> = new Map<string, Array<Sprite>>();
        this.categorisedMenuItems.clear();

        for (let sprite of this.sprites) {
            const category:string = sprite.getCategory();
            if (!map.has(sprite.getCategory())) map.set(sprite.getCategory(), new Array<Sprite>());
            
            map.get(category)?.push(sprite);
        }
        
        this.categorisedMenuItems = map;
        console.log(map);
    }

    public Log(): void {
        console.log(`All tiles categories count: ${this.categorisedMenuItems?.size}`);
        console.log(this.categorisedMenuItems);
    }
}