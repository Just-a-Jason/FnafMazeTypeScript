import { Sprites } from "../Enums/enums";
import { Clamp } from "../Scripts/utils";
import { BasicRendering } from "./BasicRendering";
import { GameObject } from "./GameObject";
import { Sprite, Vector2 } from "./Structs";

const chaseMusic:HTMLAudioElement = new Audio('Sounds/Music/Chase.ogg');
const stompSound:HTMLAudioElement = new Audio('Sounds/Music/Stomp.ogg');
stompSound.volume = 1;

chaseMusic.loop = true;
chaseMusic.volume = 0;

export class Player extends GameObject {
    public sprite: Sprite = Sprites.Guard;
    public isChased: boolean = false;
    private normalSpeed:number = 200;
    private runSpeed:number = this.normalSpeed * 2; 
    private speed:number = this.normalSpeed;
    private fov:number = 100;

    private vibrationsRunner:any = null;
    private running:boolean = false;
    private staminaMax: number = 100;
    private stamina:number = this.staminaMax;

    public Main():void {
        const gamepad = navigator.getGamepads()[0];
        this.Move(gamepad);

        if (this.isChased && chaseMusic.volume < 1) {
            if (!this.vibrationsRunner) this.vibrationsRunner = setInterval(this.DramaticVibrations, 1000);
            if (chaseMusic.paused) chaseMusic.play();
            
            const volume = Clamp(chaseMusic.volume + this.game.DeltaTime / 10, 0 , 1);
            chaseMusic.volume = volume;
        }
        else if (chaseMusic.volume > 0 && !this.isChased) {
            const volume = Clamp(chaseMusic.volume - this.game.DeltaTime / 10, 0 , 1);
            if (volume === 0) {
                chaseMusic.currentTime = 0;
                chaseMusic.pause();
                if (this.vibrationsRunner) {
                    clearInterval(this.vibrationsRunner);
                    this.vibrationsRunner = null;
                }
            }

            chaseMusic.volume = volume;
        }
    }

    public override Render(ctx: CanvasRenderingContext2D): void {
        super.Render(ctx);
        if (this.game.debug)BasicRendering.DrawCircle(ctx, this.position, this.fov, '#ff0',0.2);
    }

    private DramaticVibrations():void {
        const gamepad = navigator.getGamepads()[0];
        if (stompSound.paused)
        stompSound.play();
        gamepad?.vibrationActuator?.playEffect('dual-rumble', {
            strongMagnitude: chaseMusic.volume,
            duration: 300
        });
    }

    private Move(gamepad:Nullable<Gamepad>):void {
        if (gamepad) {
            this.HandleGamePadButtonsInput(gamepad);

            const deadZone:number = 0.4;
            const speedX = (Math.abs(gamepad.axes[0]) > deadZone) ? gamepad.axes[0] : 0;
            const speedY = (Math.abs(gamepad.axes[1]) > deadZone) ? gamepad.axes[1] : 0;

            const moveVector:Vector2 = new Vector2(speedX*this.speed*this.game.DeltaTime, speedY*this.speed*this.game.DeltaTime);
            this.position.x += moveVector.x;
            this.position.y += moveVector.y;
        }

        if (this.position.x + this.collisionRadius > this.game.canvasWidth)
            this.position.x = this.game.canvasWidth - this.collisionRadius;
        if (this.position.x < this.collisionRadius) 
            this.position.x = this.collisionRadius;

        if (this.position.y + this.collisionRadius > this.game.canvasHeight)
            this.position.y = this.game.canvasHeight - this.collisionRadius;
        if (this.position.y - this.collisionRadius < 0)
            this.position.y = this.collisionRadius;
    }

    private HandleGamePadButtonsInput(gamepad:Gamepad):void {
        // Running 
        this.running = gamepad.buttons[10].pressed;
        const staminaDropSpeed = 30;
        const staminaRegenSpeed = staminaDropSpeed * 0.5;

        if (this.running && this.stamina > 1) this.speed = this.runSpeed;
        else this.speed = this.normalSpeed;

        if (this.running && this.stamina > 1) this.stamina = Clamp(this.stamina - staminaDropSpeed * this.game.DeltaTime, 1, this.staminaMax);
        else if (!this.running && this.stamina < this.staminaMax) this.stamina = Clamp(this.stamina + staminaRegenSpeed *this.game.DeltaTime, 0, this.staminaMax);
    }

    public getStaminaPercent():number {
        return this.stamina / this.staminaMax;
    }
}