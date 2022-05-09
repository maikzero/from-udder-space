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
import Stunned from "./AlienStates/Stunned";
import Paused from "./AlienStates/Paused";

export enum AlienStates {
	CHASE = "CHASE",
	PATROL = "patrol",
    PAUSED = "paused",
    STUNNED = 'stunned'
}

export default class AlienController extends EnemyController {
    speed: number = 50;
	gravity: number = 1000;
    inRange: number = 150
    tilemap: OrthogonalTilemap;
    stunned: Boolean;

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // Ground alien has 3 states, patrolling, firing, and moving to a better position
        // State transitions will be handled in the update method, Balloon method of state transition
        // Not top down shooter GOAP
        this.addState(AlienStates.PATROL, new Patrol(this, owner));
        this.addState(AlienStates.CHASE, new Chase(this, owner));
        this.addState(AlienStates.PAUSED, new Paused(this, owner));
        this.addState(AlienStates.STUNNED, new Stunned(this, owner));

        this.direction = new Vec2(-1, 0);
        // Initialize starting state as patrol
        this.initialize(AlienStates.PATROL)
        this.tilemap = this.owner.getScene().getTilemap("Main") as OrthogonalTilemap;  

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

    // This method will check whether or not there is a dropoff in aliens path before alien moves
    // this prevents them from falling off a cliff and getting stuck
    checkForDrop(): boolean {
        return false
    }

    changeState(stateName: string): void {
       super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}