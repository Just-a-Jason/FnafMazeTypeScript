import { IUICategoryButton } from "../Interfaces/Interfaces";
import { MapEditor } from "./MapEditor";
import { Sprite } from "./Structs";

export class UIElementFactory {
    public static CreateCategoryButton(categoryName:string):IUICategoryButton {
        
        const CategoryButton:UICategoryButton = document.createElement('div');
        CategoryButton.classList.add("categoryBtn");
        
        const name:HTMLParagraphElement = document.createElement('p');
        name.innerText = categoryName;

        CategoryButton.appendChild(name);
        
        const CategoryList:CategoryList = document.createElement('div');
        categoryName = categoryName.replace(' ', '-');

        CategoryList.id = categoryName;
        CategoryList.classList.add("categoryList");
        CategoryButton.setAttribute('category-data', categoryName);

        CategoryButton.addEventListener('click', (e:MouseEvent) => {
            const target:UICategoryButton = (e.currentTarget as UICategoryButton);
            
            const category:string = target.getAttribute('category-data')!;

            const activeCategory:Nullable<CategoryList> = document.querySelector('.categoryListActive');
            
            if (activeCategory && activeCategory.id === category) {
                activeCategory.classList.remove('categoryListActive');
                return;
            }

            activeCategory?.classList.remove('categoryListActive');
            
            const categoryList:CategoryList = document.querySelector(`.categoryList#${category}`)!;
            
            categoryList.classList.add('categoryListActive');
        });

        return {
            object: CategoryButton,
            itemList: CategoryList
        };
    }

    public static CreateTileSelectableButton(sprite:Sprite):UISelectableButton {
        const SelectableButton:UISelectableButton = document.createElement('div');
        const tileName:HTMLParagraphElement = document.createElement('p');

        tileName.innerText = sprite.name;
        
        SelectableButton.setAttribute("tile-meta-name", sprite.name);
        SelectableButton.classList.add("editBoxCell");

        SelectableButton.appendChild(tileName);
        SelectableButton.appendChild(sprite.image);
        return SelectableButton;
    }
}