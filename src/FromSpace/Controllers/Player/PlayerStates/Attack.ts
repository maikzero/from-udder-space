import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import OnGround from "./OnGround";


export default class InBox extends PlayerState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('fart', false, FUS_Events.ATTACK_FINISHED)
        this.parent.attacking = true
	}

    update(deltaT: number): void {
        if(this.parent.velocity.y > 0){
			this.parent.velocity.y = 0;
		}
        super.update(deltaT)
        this.parent.velocity.x = 0;
        if(!this.parent.attacking){
            this.finished(PlayerStates.IDLE)
        }
    }

    onExit(): Record<string, any> {
        console.log('gtfo')
        return { }
    }
}