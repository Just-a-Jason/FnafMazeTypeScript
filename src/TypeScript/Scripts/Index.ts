import { IMovable } from "../Interfaces/Interfaces.js";
import { Springtrap} from "../Classes/Characters.js";
import { ControllerMode, LevelSize, SpriteChanger } from "../Enums/Enums.js";
import { Vector2 } from "../Classes/Structs.js";
import { Player } from "../Classes/Player.js";
import { Game } from "../Classes/Game.js";
import { UI } from "../Classes/UI.js";
import { Clamp } from "./Utils.js";

window.addEventListener('load', () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas#game-canvas')!;
    const context2d: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 800;

    context2d.fillStyle = 'orange';
    context2d.lineWidth = 4;

    const game: Game = new Game(canvas.width, canvas.height);
    game.UI = new UI(game);

    // game.Add(new Springtrap(new Vector2(550, 550), "Springtrap", game));
    // game.Add(new Player(new Vector2(50, 50), "Player", game));
    
    canvas.addEventListener('mousemove', (e:MouseEvent) => {
        if (mouseControllMode == ControllerMode.Mouse) {
            game.mouse.position = new Vector2(e.offsetX, e.offsetY);
        }
    });

    canvas.addEventListener('mousedown', (e:MouseEvent) => {
    });

    function GameLoop():void {
        game.Render(context2d);
        requestAnimationFrame(GameLoop);
    }
    
    let mouseControllMode:ControllerMode = ControllerMode.Mouse;
    let detectControllerLoop:number|null; 
    
    window.addEventListener('gamepadconnected', (e:GamepadEvent) => {
        detectControllerLoop = setInterval(DetectControllerPress, 100);
        console.info(`Gamepad connected. ID(${e.gamepad.id})`);
    });
    
    window.addEventListener('gamepaddisconnected', (e:GamepadEvent) => {
        clearInterval(detectControllerLoop!);
        detectControllerLoop = null;

        console.info(`Gamepad disconnected. ID(${e.gamepad.id})`);
    });

    function DetectControllerPress() {
            const gamepad = navigator.getGamepads()[0];
        if (gamepad) {
            if (gamepad.buttons[7].pressed && gamepad.buttons[1].pressed) {
                game.debug = !game.debug;
            }
            

            if (game.editMode) {
                const cursorPosition:Vector2 = game.mapEditor.cursorPosition;
                const levelSize:number = game.mapEditor.levelSize;
                const bounds: {[key:string]: number} = {minimum:levelSize * 0.5,  maximum: levelSize * (game.mapEditor.rowMaxCells-0.5)};                
                const moveVector:Vector2 = new Vector2(0,0);

                // MapEditor object reference
                const mapEditor = game.mapEditor;

                if (gamepad.buttons[15].pressed) moveVector.x = 1;  // left arrow button (PS4)
                if (gamepad.buttons[14].pressed) moveVector.x = -1; // right arrow button (PS4)
                if (gamepad.buttons[12].pressed) moveVector.y = -1; // up arrow button (PS4)
                if (gamepad.buttons[13].pressed) moveVector.y = 1;  // down arrow button (PS4)

                cursorPosition.x = Clamp(cursorPosition.x + (levelSize * moveVector.x), bounds.minimum, bounds.maximum);
                cursorPosition.y = Clamp(cursorPosition.y + (levelSize * moveVector.y), bounds.minimum, bounds.maximum);
                
                // I can also use 2D array but it's more complex to save later so i use one-dimensional array. 
                // Optimal version to run map index mapping. (runs only if player moved cursor position)
                if (moveVector.x !== 0 || moveVector.y !== 0) mapEditor.CalculateGridIndex(); 
                
                if (gamepad.buttons[0].pressed) mapEditor.PlaceSprite(); // X button (PS4)
                if (gamepad.buttons[1].pressed) mapEditor.RemoveSprite(); // Circle button (PS4)
                
                
                if (gamepad.buttons[4].pressed) mapEditor.ChangeSprite(SpriteChanger.Previous); // L1 button (PS4)
                if (gamepad.buttons[5].pressed) mapEditor.ChangeSprite(SpriteChanger.Next); // R1 button (PS4)
            }
        }
    }


    GameLoop();
});