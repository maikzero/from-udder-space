import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbductionRayState from './AbductionRayState'
import { AbductionRayStates } from "../AbductionRayController";
import UFOController from "../UFOController";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import GameLevel from "../../../Scenes/GameLevel";

export default class Active extends AbductionRayState {
    owner: AnimatedSprite;
    pollTimer: Timer;

    onEnter(options: Record<string, any>): void {
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
            
            if(this.parent.hits() && !(<GameLevel>this.owner.getScene()).invincible){
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