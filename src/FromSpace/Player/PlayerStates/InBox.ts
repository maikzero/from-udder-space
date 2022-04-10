import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../fus_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";


export default class InBox extends OnGround {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
		this.parent.speed = 0;
        this.parent.velocity.x = 0
        this.parent.velocity.y = 0
        this.owner.animation.play('inBox', true)
	}

    update(deltaT: number): void {
        super.update(deltaT);
        if(Input.isKeyJustPressed("E")){
			this.finished(PlayerStates.IDLE)
		}

    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}