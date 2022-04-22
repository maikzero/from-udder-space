import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import { AlienStates } from "../AlienController";
import PlayerController from "../../Player/PlayerController";

export default class Patrol extends AlienState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('walk', true)
	}

    update(deltaT: number): void {
        super.update(deltaT)
        this.parent.lastPlayerPos = this.parent.getPlayerPosition()
        // Just located player, start shooting
        let distance = this.owner.position.distanceTo(this.parent.playerPos);

        // if player is visible, in range, and not hiding, start chasing
        if(this.parent.lastPlayerPos !== null 
            && distance < this.parent.inRange
            && !(<PlayerController>this.parent.player._ai).hiding){
            this.finished(AlienStates.CHASE)
        }
        // Player still out of sight/ out of range / hiding
        else{
            let dir = this.parent.direction

            // boundaries of movement passed, need to flip direction
            // if moving left, and to the left of the left limit, start moving right(oppo for right)
            if((dir.x < 0 && this.owner.position.x <= this.parent.leftLimit) ||
                    (dir.x > 0 && this.owner.position.x >= this.parent.rightLimit)){
                this.parent.direction.x *= -1;
                (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
            } 

            this.parent.velocity.x = this.parent.direction.x * this.parent.speed
		    this.owner.move(this.parent.velocity.scaled(deltaT));
        }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}