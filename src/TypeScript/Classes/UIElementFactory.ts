import { Sprite } from "./Structs";

export class UIElementFactory {
    public static CreateCategoryButton() {

    }

    public static CreateTileSelectableButton(sprite:Sprite):UISelectableButton {
        const tileButton:HTMLDivElement = document.createElement('div');
        const tileName:HTMLParagraphElement = document.createElement('p');

        tileName.innerText = sprite.name;
        
        tileButton.setAttribute("tile-meta-name", sprite.name);
        tileButton.classList.add("editBoxCell");

        tileButton.appendChild(tileName);
        tileButton.appendChild(sprite.image);
        return tileButton;
    }
}