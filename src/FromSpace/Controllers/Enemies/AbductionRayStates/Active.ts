import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AbductionRayStates } from "../AbductionRayController";
import UFOController from "../UFOController";

export default class Active extends AbductionRayState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        
	}
    update(deltaT: number): void {
        super.update(deltaT)
        let ufoAI = <UFOController>this.parent.ufo._ai

        this.parent.velocity.x = (ufoAI).direction.x * ufoAI.speed
		this.owner.move(this.parent.velocity.scaled(deltaT));
        this.parent.startPosition = this.owner.position.clone()
        this.parent.updateRay()

        if(!this.parent.hits()){
            this.finished(AbductionRayStates.ABDUCTING)
        }


    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}