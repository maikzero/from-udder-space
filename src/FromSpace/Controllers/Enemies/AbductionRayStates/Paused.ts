import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AbductionRayStates } from "../AbductionRayController";
import UFOController from "../UFOController";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Paused extends AbductionRayState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
	}
    update(deltaT: number): void {
        super.update(deltaT)
        this.owner.move(new Vec2(0,0))
        if (!this.parent.paused) 
            this.finished(AbductionRayStates.ACTIVE)

    }
    onExit(): Record<string, any> {
		return {};
	}
}