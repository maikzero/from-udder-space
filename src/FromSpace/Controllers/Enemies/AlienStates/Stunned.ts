import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import { AlienStates } from "../AlienController";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Stunned extends AlienState {
    owner: AnimatedSprite;
    timer: Timer

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('stunned', true)
        //this.owner.isCollidable = false
        this.timer = new Timer(10000)
        this.timer.start()
        console.log("STUNNED")
        
	}

   update(deltaT: number): void {
        super.update(deltaT)
        if (this.timer.isStopped()){
            this.finished(AlienStates.PATROL);
        }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
       // this.owner.isCollidable = true
        this.parent.stunned = false;
		return {};
	}
}
