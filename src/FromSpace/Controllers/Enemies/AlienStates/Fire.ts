import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { AlienStates } from "../AlienController";

export default class Fire extends AlienState {
    owner: AnimatedSprite;
    pollTimer: Timer;
    exitTimer: Timer;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('shoot', true)
        this.pollTimer = new Timer(100)
        this.exitTimer = new Timer(1000)
	}

    update(deltaT: number): void {
        if (this.pollTimer.isStopped()) {
            // Restart the timer
            this.pollTimer.start();
            this.parent.playerPos = this.parent.getPlayerPosition();
            this.parent.lastPlayerPos = this.parent.playerPos;
            this.exitTimer.start();
        }

        if (this.exitTimer.isStopped()) {
            this.finished(AlienStates.PATROL);
        }

        if (this.parent.playerPos !== null) {
            let distance = this.owner.position.distanceTo(this.parent.playerPos);
            if (distance > this.parent.inRange) {
                
            }
        }
    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}