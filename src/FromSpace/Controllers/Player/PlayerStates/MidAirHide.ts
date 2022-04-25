import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../../Wolfie2D/Utils/MathUtils";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";
import OnGround from "./OnGround";
import PlayerState from "./PlayerState";

export default class MidAirHide extends PlayerState {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        console.log('enter mahide')
        if(!this.parent.hiding){
            this.owner.animation.play('hide', false, FUS_Events.PLAY_HIDE)
        }

        this.parent.hiding = true
	}

    update(deltaT: number): void {
        super.update(deltaT)

        if(this.owner.onCeiling){
			this.parent.velocity.y = 0;
		}


        // This equation slows you down horizontally as you fall/rise through the air
		this.parent.velocity.x += this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

        this.owner.move(this.parent.velocity.scaled(deltaT));

        if(this.owner.onGround){
            console.log('in air')
			this.finished(PlayerStates.IN_BOX);
		}

        if(Input.isJustPressed("unhide")){
            console.log('inbox')
            this.owner.animation.play('unhide', false, FUS_Events.FINISHED_HIDING)
            this.finished(PlayerStates.JUMP)
		}
        if(!this.parent.hiding){
            this.finished(PlayerStates.JUMP)
        }
    }

    onExit(): Record<string, any> {
        //console.log('leave mahide')
        this.parent.hiding = false
        //this.owner.animation.stop();
		return {};
	}
}