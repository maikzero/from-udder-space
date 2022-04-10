import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../fus_enums";
import { FUS_Color } from "../fus_color";

export default class EnemyController extends StateMachineAI {
	owner: GameNode;
	direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;

	// All enemies must keep a reference to the player and their position
	player: GameNode;
	playerPos: Vec2;
	lastPlayerPos: Vec2;

    initializeAI(owner: GameNode, options: Record<string, any>){
		this.owner = owner;
		this.receiver.subscribe(FUS_Events.PLAYER_MOVE);
		
		this.player = options.player;
    }

	// Implement this in the different alien classes
	isPlayerVisible(pos: Vec2): Vec2 {
		return Vec2.ZERO;
	}

	getPlayerPosition(): Vec2 {
        //Get the position of the closest player in sight
        let pos = this.player.position;
        let position = this.isPlayerVisible(pos);

        // Return the position if the player is visible
        return position
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}