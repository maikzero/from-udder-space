import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";
import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { EaseFunctionType } from "../../../../Wolfie2D/Utils/EaseFunctions";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";

export default class Jump extends InAir {
	owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		console.log('enter jump')
		//this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "jump", loop: false, holdReference: false});
		this.owner.animation.play('idle', true)
	}

    update(deltaT: number): void {
		super.update(deltaT);

		if(this.owner.onCeiling){
			this.parent.velocity.y = 0;
		}

		// If we're falling, go to the fall state
		if(this.parent.velocity.y >= 0){
			this.finished(PlayerStates.FALL);
		}

		if(Input.isJustPressed("hide")){
			this.finished(PlayerStates.MIDAIR_HIDE)
		}

		
	}

	onExit(): Record<string, any> {
		//console.log('leave jump')
		this.owner.animation.stop();
		return {};
	}
}