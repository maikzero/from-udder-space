import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../../fus_enums";
import { FUS_Color } from "../../fus_color";
import EnemyController from "./EnemyController"

export enum UFOStates {
	SCAN = "scan",
	ABDUCT = "abduct"
}

export default class UFOController extends EnemyController {
    speed: number = 100;
	gravity: number = 0;

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // TODO: Add Possible States
        this.direction = new Vec2(-1, 0);

        // TODO: Initialize starting state
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}