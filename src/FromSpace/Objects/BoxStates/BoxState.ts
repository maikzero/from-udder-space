import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { FUS_Color } from "../../fus_color";
import { FUS_Events } from "../../fus_enums";
import BoxController, { BoxStates } from "../BoxController";

export default abstract class BoxState extends State {
	owner: GameNode;
	parent: BoxController;

    constructor(parent: StateMachine, owner: GameNode) {
		super(parent);
		this.owner = owner;
	}

    handleInput(event: GameEvent): void {
        if(event.type === FUS_Events.PICKUP_BOX){
            if((<BoxController>event.data.get('box')) == this.parent){
                this.finished(BoxStates.IN_USE)
            }
        }
    }

    update(deltaT: number): void {

    }


}