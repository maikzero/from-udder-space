import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import UFOController from "../UFOController";
import PlayerController from "../../Player/PlayerController";
import { AbductionRayStates } from "../AbductionRayController";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Abducting extends AbductionRayState {
    owner: AnimatedSprite;
    pollTimer: Timer;

    onEnter(options: Record<string, any>): void {
        (<PlayerController>this.parent.player._ai).gravity -= 300;
        (<UFOController>this.parent.ufo._ai).abducting += 1;
        this.pollTimer = new Timer(100)
	}
    update(deltaT: number): void {
        super.update(deltaT)
        let ufoAI = <UFOController>this.parent.ufo._ai

        if (this.parent.paused) {
			this.finished(AbductionRayStates.PAUSED)
        }

        this.parent.velocity.x = (ufoAI).direction.x * ufoAI.speed
		this.owner.move(this.parent.velocity.scaled(deltaT));
        this.parent.startPosition = this.owner.position.clone()
        if(this.pollTimer.isStopped()){
            this.parent.updateRay()
            if(!this.parent.hits()){
                this.finished(AbductionRayStates.ACTIVE)
            }
            this.pollTimer.start(100)
        }

    }

    onExit(): Record<string, any> {
        (<PlayerController>this.parent.player._ai).gravity += 300;
        (<UFOController>this.parent.ufo._ai).abducting -= 1;
		return {};
	}
}