import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import { AlienStates } from "../AlienController";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Paused extends AlienState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('walk', true)
        console.log("Alien Paused")
	}

   update(deltaT: number): void {
        super.update(deltaT)
        //this.owner.move(new Vec2(0,1))
        if (!this.parent.paused) 
            this.finished(AlienStates.PATROL)
    }

    onExit(): Record<string, any> {
        console.log('Alien Unpaused')
        this.owner.animation.stop();
		return {};
	}
}
