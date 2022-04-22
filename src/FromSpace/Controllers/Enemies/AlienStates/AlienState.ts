import State from "../../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../../Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MathUtils from "../../../../Wolfie2D/Utils/MathUtils";
import { FUS_Color } from "../../../fus_color";
import { FUS_Events } from "../../../fus_enums";
import AlienController, { AlienStates } from "../AlienController";

export default abstract class BalloonState extends State {
    owner: GameNode;
	gravity: number = 500;
	parent: AlienController;

	constructor(parent: StateMachine, owner: GameNode) {
		super(parent);
		this.owner = owner;
	}

    handleInput(event: GameEvent): void {
        
    }

    update(deltaT: number): void {

    }
}
