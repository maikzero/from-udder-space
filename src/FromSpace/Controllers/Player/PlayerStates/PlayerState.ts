import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Input from "../../../../Wolfie2D/Input/Input";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { FUS_Events } from "../../../fus_enums";
import PlayerController from "../PlayerController";
import { PlayerStates } from "../PlayerController";

export default abstract class PlayerState extends State {
    owner: GameNode;
	parent: PlayerController;
	positionTimer: Timer;

	constructor(parent: StateMachine, owner: GameNode){
		super(parent);
		this.owner = owner;
		this.positionTimer = new Timer(250);
		this.positionTimer.start();
	}

    handleInput(event: GameEvent): void {
		
    }

    /** 
	 * Get the inputs from the keyboard, or Vec2.Zero if nothing is being pressed
	 */
	getInputDirection(): Vec2 {
		let direction = Vec2.ZERO;
		direction.x = (Input.isPressed("left") ? -1 : 0) + (Input.isPressed("right") ? 1 : 0);
		direction.y = (Input.isJustPressed("jump") ? -1 : 0);
		return direction;
	}

	update(deltaT: number): void {
		
		if (this.positionTimer.isStopped()){
			this.emitter.fireEvent(FUS_Events.PLAYER_MOVE, {position: this.owner.position.clone()});
			this.positionTimer.start();
		}
		this.parent.velocity.y += this.parent.gravity*deltaT;

		if (this.parent.paused) 
        	this.finished(PlayerStates.PAUSED)
	}
}