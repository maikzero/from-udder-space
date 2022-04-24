import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState';
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { AlienStates } from "../AlienController";
import PlayerController from "../../Player/PlayerController";

export default class Chase extends AlienState {
    owner: AnimatedSprite;
    pollTimer: Timer;
    exitTimer: Timer;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('walk', true)
        this.pollTimer = new Timer(100)
        this.exitTimer = new Timer(1000)
	}

    update(deltaT: number): void {
        super.update(deltaT)
        this.parent.playerPos = this.parent.getPlayerPosition()
        this.parent.lastPlayerPos = this.parent.playerPos;

        if(this.parent.lastPlayerPos === null){
            this.finished(AlienStates.PATROL)
        }
        else{
            let distance = this.owner.position.distanceTo(this.parent.lastPlayerPos)
            if(distance > this.parent.inRange || (<PlayerController>this.parent.player._ai).hiding){
                this.finished(AlienStates.PATROL)
            }
            else{
                this.chaseOpps(deltaT)
            }
        }
    }

    chaseOpps(deltaT: number): void {
        if(this.parent.playerPos.x > this.owner.position.x){
            this.parent.direction.x = 1;
            (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
        }
        else{
            this.parent.direction.x = -1;
            (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
        }

        this.parent.velocity.x = this.parent.direction.x * this.parent.speed
        this.owner.move(this.parent.velocity.scaled(deltaT));
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}