import { AssetsLoader } from "../Classes/Networking/AssetsLoader";
import { ControllerMode } from "../Enums/ControllerMode";
import { SpriteChanger } from "../Enums/SpriteChanger";
import { Vector2 } from "../Structs/Vector2";
import { Sprite } from "../Structs/Sprite";
import { Camera } from "../Classes/Camera";
import { Game } from "../Classes/Game";
import { UI } from "../Classes/UI";
import { Clamp } from "./utils";
import { UISelectionMenu } from "../Classes/UISelectionMenu";
import MousePointer from "../Classes/MousePointer";

window.addEventListener('load', async () => {
    const music:HTMLAudioElement = new Audio("Sounds/Music/music.ogg");
    music.loop = true;
    
    const canvas: HTMLCanvasElement = document.querySelector('canvas#game-canvas')!;
    const context2d: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.height = 800;
    canvas.width = 800;
    
    // Wait until AssetsLoader finish loading sprites
    const sprites:Array<Sprite> = await AssetsLoader.loadSprites();

    const game: Game = new Game(canvas.width, canvas.height);
    game.UI = new UI(game);
    game.mapEditor.setSprites(sprites);
    
    const ui: UISelectionMenu = new UISelectionMenu(sprites);
    
    canvas.addEventListener('mousemove', (e:MouseEvent) => {
        if (mouseControllMode === ControllerMode.Mouse) {
            const gridCellSize = game.mapEditor.levelSize * 0.5;
            const mouseX = Clamp(e.offsetX, gridCellSize, game.canvasWidth);
            const mouseY = Clamp(e.offsetY, gridCellSize, game.canvasHeight);

            let xpos = Math.ceil(mouseX / gridCellSize); 
            let ypos = Math.ceil(mouseY / gridCellSize); 
            if (xpos %2 === 0) xpos--;
            if (ypos %2 === 0) ypos--;
            
            const gridPosition:Vector2 = new Vector2(Math.round(xpos * gridCellSize), Math.round(ypos * gridCellSize));
            game.mapEditor.cursorPosition = gridPosition;
        }
    });
    
    canvas.addEventListener('contextmenu', (e:MouseEvent) => {
        e.preventDefault(); // Prevent the default context menu from appearing
    });

    canvas.addEventListener('mousedown', (e:MouseEvent) => {
        music.play();
        if (!game.editMode) return;

        const mapEditor = game.mapEditor;
        mapEditor.calculateGridIndex();

        if (e.button === 0)  mapEditor.placeSprite();
        if (e.button === 2)  mapEditor.removeSprite();
    });

    function gameLoop():void {
        game.render(context2d);
        requestAnimationFrame(gameLoop);
    }
    
    let mouseControllMode:ControllerMode = ControllerMode.Mouse;
    let detectControllerLoop:any; 
    
    window.addEventListener('gamepadconnected', (e:GamepadEvent) => {
        detectControllerLoop = setInterval(detectControllerPress, 100);
        console.info(`Gamepad connected. ID(${e.gamepad.id})`);
        mouseControllMode = ControllerMode.Controller;
    });
    
    window.addEventListener('gamepaddisconnected', (e:GamepadEvent) => {
        clearInterval(detectControllerLoop!);
        detectControllerLoop = null;
        console.info(`Gamepad disconnected. ID(${e.gamepad.id})`);
        mouseControllMode = ControllerMode.Mouse;
    });

    window.addEventListener('keydown', (e:KeyboardEvent) => {
        if (game.editMode) {
            const mainCamera:Camera = game.mainCamera;
            const moveSpeed:number = game.mapEditor.levelSize;
            const targetPosition:Vector2 = mainCamera.targetPosition; 

            switch(e.key) {
                case 'w': targetPosition.y += -moveSpeed; break;
                case 's': targetPosition.y += moveSpeed; break;
                case 'a': targetPosition.x += -moveSpeed; break;
                case 'd': targetPosition.x += moveSpeed; break;
                
                case 'q': game.mapEditor.changeSprite(SpriteChanger.Previous); break;
                case 'e': game.mapEditor.changeSprite(SpriteChanger.Next); break;
            }
        }
    });

    const mousePointer = new MousePointer();
    game.addObject(mousePointer);

    // Handle mouse zooming
    canvas.addEventListener('wheel', (e:WheelEvent) => {
    });

    canvas.addEventListener('mousemove', (e) => {
        mousePointer.setPosition(e);
    });

    function detectControllerPress() {
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
                if (moveVector.x !== 0 || moveVector.y !== 0) mapEditor.calculateGridIndex(); 
                
                if (gamepad.buttons[0].pressed) mapEditor.placeSprite(); // X button (PS4)
                if (gamepad.buttons[1].pressed && !game.debug) mapEditor.removeSprite(); // Circle button (PS4)
                
                // L1 button (PS4)
                if (gamepad.buttons[4].pressed) {
                    mapEditor.changeSprite(SpriteChanger.Previous);
                    gamepad.vibrationActuator?.playEffect('dual-rumble', {
                        duration: 100,
                        weakMagnitude: 0.7
                    });
                } 
                // R1 button (PS4)
                if (gamepad.buttons[5].pressed) {
                    mapEditor.changeSprite(SpriteChanger.Next);
                    gamepad.vibrationActuator?.playEffect('dual-rumble', {
                        duration: 100,
                        weakMagnitude: 0.7  
                    });
                } 
            }
        }
    }

    gameLoop();
});