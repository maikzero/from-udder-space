import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../../fus_enums";
import { FUS_Color } from "../../fus_color";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import EnemyController from "./EnemyController";
import Patrol from "./AlienStates/Patrol";
import Chase from "./AlienStates/Chase";

export enum AlienStates {
	CHASE = "CHASE",
	PATROL = "patrol"
}

export default class AlienController extends EnemyController {
    speed: number = 100;
	gravity: number = 1000;
    inRange: number = 100

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // Ground alien has 3 states, patrolling, firing, and moving to a better position
        // State transitions will be handled in the update method, Balloon method of state transition
        // Not top down shooter GOAP
        this.addState(AlienStates.PATROL, new Patrol(this, owner));
        this.addState(AlienStates.CHASE, new Chase(this, owner))

        this.direction = new Vec2(-1, 0);
        // Initialize starting state as patrol
        this.initialize(AlienStates.PATROL)

        this.getPlayerPosition()
    }

    isPlayerVisible(pos: Vec2): Vec2 {
        return super.isPlayerVisible(pos)
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