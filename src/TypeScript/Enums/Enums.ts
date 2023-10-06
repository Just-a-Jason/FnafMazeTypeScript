import { Sprite } from "../Classes/Structs.js";

export const enum SpriteCategory {
    Character, SolidTile,
    PlayerSprite, GameAsset
}

export const Sprites = {
    NightmareFoxy: new Sprite('NightmareFoxy', SpriteCategory.Character, '../Images/Sprites/NightmareFoxy.webp', 70, 70),
    GoldenFreddy: new Sprite('GoldenFreddy', SpriteCategory.Character, '../Images/Sprites/GoldenFreddy.webp', 70, 70),
    Springtrap: new Sprite('Springtrap', SpriteCategory.Character,'../Images/Sprites/Springtrap.webp', 70, 70),
    Bonnie: new Sprite('Springtrap', SpriteCategory.Character,'../Images/Sprites/Bonnie.webp', 70, 70),
    CupCake: new Sprite('Cupcake', SpriteCategory.Character,'../Images/Sprites/Cupcake.webp', 50, 50),
    William: new Sprite('William', SpriteCategory.Character,'../Images/Sprites/William.webp', 70, 70),
    Freddy: new Sprite('Freddy', SpriteCategory.Character, '../Images/Sprites/Freddy.webp', 70, 70),
    Chica: new Sprite('Chica', SpriteCategory.Character,'../Images/Sprites/Chica.webp', 70, 70),
    Foxy: new Sprite('Foxy', SpriteCategory.Character,'../Images/Sprites/Foxy.webp', 70, 70),
    Player: new Sprite('Guard', SpriteCategory.PlayerSprite,'../Images/Player/Guard.webp', 70, 70),
    Wall: new Sprite('Wall', SpriteCategory.SolidTile,'../Images/Sprites/Wall.webp', 70, 70),
    DashedBG: new Sprite('DashedBG', SpriteCategory.GameAsset,'../Images/Assets/dashedbg.png', 40, 40),
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