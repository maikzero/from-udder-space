import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../../fus_enums";
import { FUS_Color } from "../../fus_color";
import EnemyController from "./EnemyController"
import AbductionRayController from "./AbductionRayController"
import Scan from "./UFOStates/Scan";
import Abduct from "./UFOStates/Abduct";
import Graphic from "../../../Wolfie2D/Nodes/Graphic";
import Line from "../../../Wolfie2D/Nodes/Graphics/Line";
import Color from "../../../Wolfie2D/Utils/Color";

export enum UFOStates {
	SCAN = "scan",
	ABDUCT = "abduct"
}

export default class UFOController extends EnemyController {
    speed: number = 100;
	gravity: number = 0;
    abductionRays: Array<Graphic>
    inRange: number
    abducting: number


    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // TODO: Add Possible States
        this.direction = new Vec2(-1, 0);

        // TODO: Initialize starting state
        this.addState(UFOStates.SCAN, new Scan(this, owner));
        this.addState(UFOStates.ABDUCT, new Abduct(this, owner))

        this.inRange = 500
        this.abducting = 0
        this.initializeRays()
        
        // Initialize starting state as patrol
        this.initialize(UFOStates.SCAN)

        this.getPlayerPosition()
    }

    initializeRays(): void {
        this.abductionRays = []
        let scene = this.owner.getScene()
        // this.owner.position.x - 10
        const ownerPos = this.owner.position
        let start = new Vec2(ownerPos.x - 16, ownerPos.y+20)
        let end = new Vec2(ownerPos.x + 16, ownerPos.y+20)

        let startY = start.y
        let directionalNum = -8

        for(let i = start.x; i <= end.x; i+=2){
            let rayStart = new Vec2(i, startY)

            let ray = scene.add.graphic("LINE", "primary", {start: rayStart.clone(), end: start.add(new Vec2(0, 100))});
            let direction = new Vec2(directionalNum * .05, 1);
            console.log(direction);
            (<Line>ray).thickness = 70
            ray.color = Color.GREEN
            ray.addPhysics()
            ray.addAI(AbductionRayController, { startPosition: rayStart.clone(), index: i - this.owner.position.x + 1, ufo: this.owner, player: this.player, direction: direction })
            ray.setGroup('ray')
            directionalNum+=1;
        }
    }

    isPlayerVisible(pos: Vec2): Vec2 {
        let position = super.isPlayerVisible(pos)

        // if player is visible, now we must check whether or not they are within 
        // the radius of the abduction beam
        if(position !== null){

        }
        return position
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