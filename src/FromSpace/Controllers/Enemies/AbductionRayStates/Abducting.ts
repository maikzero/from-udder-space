import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AlienStates } from "../AlienController";
import UFOController from "../UFOController";
import PlayerController from "../../Player/PlayerController";
import { AbductionRayStates } from "../AbductionRayController";

export default class Active extends AbductionRayState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        (<PlayerController>this.parent.player._ai).gravity -= 500
	}
    update(deltaT: number): void {
        super.update(deltaT)
        let ufoAI = <UFOController>this.parent.ufo._ai

        this.parent.velocity.x = (ufoAI).direction.x * ufoAI.speed
		this.owner.move(this.parent.velocity.scaled(deltaT));
        this.parent.startPosition = this.owner.position.clone()
        this.parent.updateRay()
        if(!this.parent.hits()){
            this.finished(AbductionRayStates.ACTIVE)
        }

    }

    onExit(): Record<string, any> {
        (<PlayerController>this.parent.player._ai).gravity += 500
		return {};
	}
}