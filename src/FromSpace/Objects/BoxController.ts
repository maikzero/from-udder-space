import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../fus_enums";
import { FUS_Color } from "../fus_color";
import Idle from "./BoxStates/Idle";
import InUse from "./BoxStates/InUse";

export enum BoxStates {
    IDLE = "idle",
    IN_USE = "in_use"
}

export default class BoxController extends StateMachineAI {
    owner: GameNode;
    direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;

    speed: number = 0;
	gravity: number = 0;

    // All enemies must keep a reference to the player and their position
	player: GameNode;
	playerPos: Vec2;
	lastPlayerPos: Vec2;

    initializeAI(owner: GameNode, options: Record<string, any>){
        this.owner = owner;
		this.receiver.subscribe(FUS_Events.PLAYER_MOVE);
        this.receiver.subscribe(FUS_Events.PICKUP_BOX);
        this.player = options.player;

        this.addState(BoxStates.IDLE, new Idle(this, owner));
        this.addState(BoxStates.IN_USE, new InUse(this, owner));

        this.initialize(BoxStates.IDLE)

        this.getPlayerPosition()

    }

    getPlayerPosition(): Vec2 {
        return this.player.position
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}


	update(deltaT: number): void {
		super.update(deltaT);
        this.getPlayerPosition()
	}
}