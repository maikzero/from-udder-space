import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AlienStates } from "../AlienController";
import UFOController from "../UFOController";
import PlayerController from "../../Player/PlayerController";
import { AbductionRayStates } from "../AbductionRayController";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Active extends AbductionRayState {
    owner: AnimatedSprite;
    pollTimer: Timer;

    onEnter(options: Record<string, any>): void {
        (<PlayerController>this.parent.player._ai).gravity -= 2000
        this.pollTimer = new Timer(100)
	}
    update(deltaT: number): void {
        super.update(deltaT)
        let ufoAI = <UFOController>this.parent.ufo._ai

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
        (<PlayerController>this.parent.player._ai).gravity += 2000
		return {};
	}
}