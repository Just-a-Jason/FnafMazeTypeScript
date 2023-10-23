import { IChaser, IMovable } from "../Interfaces/interfaces";
import { BasicRendering } from "./BasicRendering";
import { CharacterBase } from "./CharaterBase";
import { Sprite, Vector2} from "./Structs";
import { RandInt } from "../Scripts/utils";
import { GameObject } from "./GameObject";
import { Sprites } from "../Enums/Sprites";
import { Player } from "./Player";
import { Game } from "./Game";


export abstract class WanderableCharacter extends CharacterBase {
    public targetPosition?: Vector2;

    public Wander():void {
        if (this.targetPosition) {
            // Logic
            let distance: Vector2 = Vector2.Distance(this.position, this.targetPosition);
            const far:number = Math.hypot(distance.y, distance.x);

            let speedX: number;
            let speedY: number;

            if (far > this.speed) {
                speedX = distance.x / far || 0;
                speedY = distance.y / far || 0;
            } else {
                speedX = 0;
                speedY = 0;
                this.targetPosition = undefined;
            }

            this.position.x += speedX * this.speed;
            this.position.y += speedY * this.speed;
        }
        else {
            this.targetPosition = new Vector2(RandInt(this.game.canvasWidth), RandInt(this.game.canvasHeight));
        }
    }
    public override Render(ctx:CanvasRenderingContext2D):void {
        super.Render(ctx);
        if (this.game.debug) {
            if (this.targetPosition) {
                BasicRendering.DrawCircle(ctx,this.targetPosition,30,'#333',0.5);
                ctx.beginPath();
                ctx.fillStyle = '#00f';
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
                ctx.stroke();
            }
            BasicRendering.DrawCircle(ctx,this.collisionPosition,this.collisionRadius,'#f00',0.5);
            if (this.sprite)
            BasicRendering.DrawSprite(ctx,this.position, this.sprite);
        }
    }
}

export class Springtrap extends WanderableCharacter implements IChaser {
    public sprite: Sprite = Sprites.Springtrap;
    public isChaseing: boolean = false;
    public speed: number = 2;
    public fov: number = 150;
    public normalSpeed: number = this.speed;
    

    public maxEscapeZone: number = this.fov * 1.75;
    public target?:Nullable<GameObject> = null;
    public chaseSpeed?: number = this.speed * 2;


    public override Main():void {
        this.Chase();
        this.Wander();
        super.Main();
    }

    public Chase():void {
        this.speed = (!this.isChaseing) ? this.normalSpeed : this.chaseSpeed!;
        if (!this.target) {
            const potencialTargets = this.game.FindObjectsByType<IMovable>(GameObject, this);
            if (potencialTargets) {
                for (const target of potencialTargets) {
                    const distanceBetween:Vector2 = Vector2.Distance(this.position, target.position);
                    const distance = Math.hypot(distanceBetween.y, distanceBetween.x);

                    if (distance <= this.fov) {
                        this.target = target as GameObject;
                        this.isChaseing = true;
                        
                        const gamepad = navigator.getGamepads()[0];
                        if (gamepad) {
                            gamepad.vibrationActuator?.playEffect('dual-rumble', {
                                duration: 1000,
                                strongMagnitude: 1
                            });
                            (target as Player).isChased = true;
                        }
                    }
                }
            }
        }
        else {
            this.targetPosition = new Vector2(this.target.position.x, this.target.position.y);
            const distanceBetween:Vector2 = Vector2.Distance(this.position, this.target.position);
            const distance = Math.hypot(distanceBetween.y, distanceBetween.x);

            if (distance > this.maxEscapeZone) {
                (this.target as Player).isChased = false;
                this.target = null; 
                this.isChaseing = false;
            }
        }
    }

    public override Render(ctx:CanvasRenderingContext2D):void {
        super.Render(ctx);
        if (this.game.debug) BasicRendering.DrawCircle(ctx,this.position,this.maxEscapeZone,'#ff0',0.2);
    }
}