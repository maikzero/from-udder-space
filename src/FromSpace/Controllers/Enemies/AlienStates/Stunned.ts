import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import { AlienStates } from "../AlienController";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Stunned extends AlienState {
    owner: AnimatedSprite;
    timer: Timer

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('stunned', false)
        this.owner.animation.queue('stunned_loop', true)
        this.timer = new Timer(3000)
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
        this.parent.stunned = false;
		return {};
	}
}
