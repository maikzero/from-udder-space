import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";
import PlayerState from "./PlayerState";

export default class InBox extends PlayerState {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        console.log('enter inbox')
        if(!this.parent.hiding){
            this.owner.animation.play('hide', false, FUS_Events.PLAY_HIDE)
        }
        this.parent.hiding = true
	}

    update(deltaT: number): void {
        super.update(deltaT)
        if(this.parent.velocity.y < 0){
            this.finished(PlayerStates.MIDAIR_HIDE)
        }
        
        this.parent.velocity.y = 0
        this.parent.velocity.x = 0;
        if(Input.isJustPressed("unhide")){
            console.log('inbox')
            this.owner.animation.play('unhide', false, FUS_Events.FINISHED_HIDING)
            this.finished(PlayerStates.IDLE)
		}
        if(!this.parent.hiding){
            this.finished(PlayerStates.IDLE)
        }

        this.owner.move(this.parent.velocity.scaled(deltaT));

    }

    onExit(): Record<string, any> {
        //console.log('leave inbox')
        this.parent.hiding = false
        this.owner.animation.stop();
		return {};
	}
}