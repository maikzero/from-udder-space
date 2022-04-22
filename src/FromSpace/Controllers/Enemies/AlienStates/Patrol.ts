import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import { AlienStates } from "../AlienController";

export default class Patrol extends AlienState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('walk', true)
	}

    update(deltaT: number): void {
        this.parent.lastPlayerPos = this.parent.getPlayerPosition()
        // Just located player, start shooting
        if(this.parent.lastPlayerPos !== null){
            this.finished(AlienStates.FIRE)
        }
        // Player still out of sight
        else{
            let dir = this.parent.direction
            // boundaries of movement passed, need to flip direction
            if((dir.x < 0 && this.owner.position.x <= this.parent.leftLimit) ||
                    (dir.x > 0 && this.owner.position.x >= this.parent.rightLimit)){

                this.parent.direction.x *= -1;
                (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
            } 
        }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}