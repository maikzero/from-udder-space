import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import OnGround from "./OnGround";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Rect from "../../../../Wolfie2D/Nodes/Graphics/Rect";


export default class InBox extends PlayerState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        let behindAdder = -32
        if(this.owner.invertX){
            behindAdder = 32
        }
        //this.parent.addAttackRegion(new Vec2(this.owner.position.x + behindAdder, this.owner.position.y), new Vec2(2,2))
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
        //this.parent.attackRegion = null
        return { }
    }
}