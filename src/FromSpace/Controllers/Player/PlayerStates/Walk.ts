import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Walk extends OnGround {
	owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		console.log('enter walk')
		this.parent.speed = this.parent.MIN_SPEED;
		this.owner.animation.play('walk', true)
	}

    update(deltaT: number): void {
		super.update(deltaT);
		let dir = this.getInputDirection();

		if(dir.isZero()){
		//	console.log('walk')
			this.finished(PlayerStates.IDLE);
		} else {
			if(Input.isPressed("run")){
			//	console.log('walk')
				this.finished(PlayerStates.RUN);
			}
		}

		if(Input.isJustPressed("hide")){
		//	console.log('walk rehide')
			this.finished(PlayerStates.IN_BOX)
		}
		else if(Input.isJustPressed("attack")){
			this.finished(PlayerStates.ATTACK)
		}

		this.parent.velocity.x = dir.x * this.parent.speed

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		//console.log('leave walk')
		this.owner.animation.stop();
		return {};
	}
}