import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";
import PlayerState from "./PlayerState";

export default class InBox extends PlayerState {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.hiding = true
        this.owner.animation.play('hide', false, FUS_Events.PLAY_HIDE)
	}

    update(deltaT: number): void {
        if(this.parent.velocity.y > 0){
			this.parent.velocity.y = 0;
		}
        super.update(deltaT)
        if(Input.isJustPressed("unhide")){
            console.log('inbox')
            this.owner.animation.play('unhide', false, FUS_Events.FINISHED_HIDING)
		}
        if(!this.parent.hiding){
            this.finished(PlayerStates.IDLE)
        }

        this.parent.velocity.x = 0;

    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}