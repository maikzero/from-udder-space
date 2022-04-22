import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Idle extends OnGround {
	owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
		this.owner.animation.play('idle', true)
	}

    update(deltaT: number): void {
		super.update(deltaT);

		let dir = this.getInputDirection();

		if(!dir.isZero() && dir.y === 0){
			if(Input.isPressed("run")){
				console.log('idle')
				this.finished(PlayerStates.RUN);
			} else {
				console.log('idle')
				this.finished(PlayerStates.WALK);
			}
		}
		
		this.parent.velocity.x = 0;

		this.owner.move(this.parent.velocity.scaled(deltaT));

		if(Input.isJustPressed("hide")){
			console.log('idle rehide')
			this.finished(PlayerStates.IN_BOX)
		}
		else if(Input.isJustPressed("attack")){
			this.finished(PlayerStates.ATTACK)
		}
	}

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}