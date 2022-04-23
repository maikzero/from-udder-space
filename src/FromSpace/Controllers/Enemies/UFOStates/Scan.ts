import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import UFOState from './UFOState'
import { AlienStates } from "../AlienController";
import PlayerController from "../../Player/PlayerController";

export default class Scan extends UFOState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('IDLE_LEFT', true)
	}
    update(deltaT: number): void {
        super.update(deltaT)
        this.parent.lastPlayerPos = this.parent.getPlayerPosition()
        
        // Player still out of sight/ out of range / hiding

        let dir = this.parent.direction

        // boundaries of movement passed, need to flip direction
        // if moving left, and to the left of the left limit, start moving right(oppo for right)
        if((dir.x < 0 && this.owner.position.x/32 <= this.parent.leftLimit) ||
                (dir.x > 0 && this.owner.position.x/32 >= this.parent.rightLimit)){
            this.parent.direction.x *= -1;
        } 

        this.parent.velocity.x = this.parent.direction.x * this.parent.speed
        this.owner.move(this.parent.velocity.scaled(deltaT));
    

    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}