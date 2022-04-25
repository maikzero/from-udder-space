import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";

export default class Fall extends InAir {
    owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		console.log('enter fall')
        this.owner.animation.play("idle", true)
    }

    update(deltaT: number): void {
		super.update(deltaT);

		if(Input.isJustPressed("hide")){
			console.log('walk rehide')
			this.finished(PlayerStates.MIDAIR_HIDE)
		}

		
	}

    onExit(): Record<string, any> {
		//console.log('leave fall')
		this.owner.animation.stop();
        return {};
    }
}