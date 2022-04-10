import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../fus_enums";
import { FUS_Color } from "../fus_color";
import EnemyController from "./EnemyController";
//import Patrol from "./AlienStates/Patrol";
//import Fire from "./AlienStates/Fire";
//import MoveCloser from "./AlienStates/MoveCloser";

export enum AlienStates {
	FIRE = "fire",
	PATROL = "patrol",
    MOVE_CLOSER = "move_closer"
}

export default class AlienController extends EnemyController {
    speed: number = 100;
	gravity: number = 1000;

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // Ground alien has 3 states, patrolling, firing, and moving to a better position
        // State transitions will be handled in the update method, Balloon method of state transition
        // Not top down shooter GOAP
        //this.addState(AlienStates.PATROL, new Patrol(this, owner, options.startPosition));
        //this.addState(AlienStates.FIRE, new Fire(this, owner))
        //this.addState(AlienStates.MOVE_CLOSER, new MoveCloser(this, owner))

        // TODO: Add more attributes specific to certain aliens (Health, weapon, etc)

        this.direction = new Vec2(-1, 0);

        // Initialize starting state as patrol
        this.initialize(AlienStates.PATROL)

        this.getPlayerPosition()
    }

    // TODO, need to figure out how TopDownShooter method works, prob gonna go to OH
    // That implementation can prob be ported to this, with some adjustments
    // Override the parent Enemy method
    // I believe getPlayerPosition in EnemyController will go to this method, not positive though
    isPlayerVisible(pos: Vec2): Vec2 {
        let start = this.owner.position.clone();
        let delta = pos.clone().sub(start);

        return Vec2.ZERO
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}