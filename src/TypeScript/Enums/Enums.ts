import { Sprite } from "../Classes/Structs.js";

export const enum SpriteCategory {
    Character, SolidTile,
    PlayerSprite, GameAsset,
    CustomTile, PowerUp,
    CollectableItem
}

export const Sprites = {
    NightmareFoxy: new Sprite('NightmareFoxy', SpriteCategory.Character, '../Images/Sprites/Characters/NightmareFoxy.webp', 70, 70),
    GoldenFreddy: new Sprite('GoldenFreddy', SpriteCategory.Character, '../Images/Sprites/Characters/GoldenFreddy.webp', 70, 70),
    Springtrap: new Sprite('Springtrap', SpriteCategory.Character,'../Images/Sprites/Characters/Springtrap.webp', 70, 70),
    Bonnie: new Sprite('Bonnie', SpriteCategory.Character,'../Images/Sprites/Characters/Bonnie.webp', 70, 70),
    Cupcake: new Sprite('Cupcake', SpriteCategory.Character,'../Images/Sprites/Characters/Cupcake.webp', 50, 50),
    William: new Sprite('William', SpriteCategory.Character,'../Images/Sprites/Characters/William.webp', 70, 70),
    Freddy: new Sprite('Freddy', SpriteCategory.Character, '../Images/Sprites/Characters/Freddy.webp', 70, 70),
    Chica: new Sprite('Chica', SpriteCategory.Character,'../Images/Sprites/Characters/Chica.webp', 70, 70),
    Foxy: new Sprite('Foxy', SpriteCategory.Character,'../Images/Sprites/Characters/Foxy.webp', 70, 70),
    Guard: new Sprite('Guard', SpriteCategory.PlayerSprite,'../Images/Sprites/Player/Guard.webp', 70, 70),
    Wall: new Sprite('Wall', SpriteCategory.SolidTile,'../Images/Sprites/Solid Tiles/Wall.webp', 70, 70),
    DashedBG: new Sprite('DashedBG', SpriteCategory.GameAsset,'../Images/Assets/dashedbg.png', 40, 40),
    Coin:new Sprite('Coin', SpriteCategory.CollectableItem, '../Images/Sprites/Collectables/coin.webp',20,20),
    Cherry:new Sprite('Cherry', SpriteCategory.CollectableItem, '../Images/Sprites/Collectables/cherry.webp',70,70),
    Mask:new Sprite('Mask', SpriteCategory.PowerUp, '../Images/Sprites/Powerups/mask.webp',70,70),
    FlashLight:new Sprite('FlashLight', SpriteCategory.PowerUp, '../Images/Sprites/Powerups/flashlight.webp',70,70),
    PhoneCall:new Sprite('PhoneCall', SpriteCategory.PowerUp, '../Images/Sprites/Powerups/phone call.webp',70,70),
    PinkBlock: new Sprite('PinkBlock', SpriteCategory.CustomTile, '../Images/Sprites/Custom Tiles/pink.webp',70,70)
};

export const enum ControllerMode {
    Controller = 1, Mouse = 0
}

export const enum LevelSize {
    Small = 100,
    Medium = 50,
    Large = 20 
}

export const enum SpriteChanger {
    Next = 1, Previous = -1
}

export const enum FillAligment {
    FromLeftToRight, FromRightToLeft
}

export const enum Directions {
    Up = 1, Down = -1, Right = 1, Left = -1
}