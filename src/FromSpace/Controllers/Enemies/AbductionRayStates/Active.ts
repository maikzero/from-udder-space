import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AbductionRayStates } from "../AbductionRayController";
import UFOController from "../UFOController";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export default class Active extends AbductionRayState {
    owner: AnimatedSprite;
    pollTimer: Timer;

    onEnter(options: Record<string, any>): void {
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
            
            if(this.parent.hits()){
                this.finished(AbductionRayStates.ABDUCTING)
            }
            else{
                this.pollTimer.start(100)
            }
        }


    }
    onExit(): Record<string, any> {
		return {};
	}
}