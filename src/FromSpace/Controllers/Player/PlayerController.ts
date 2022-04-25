import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode, { TweenableProperties } from "../../../Wolfie2D/Nodes/GameNode";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { FUS_Events } from "../../fus_enums";
import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import InAir from "./PlayerStates/InAir";
import InBox from "./PlayerStates/InBox";
import Jump from "./PlayerStates/Jump";
import Run from "./PlayerStates/Run";
import Walk from "./PlayerStates/Walk";
import Attack from "./PlayerStates/Attack";
import Paused from "./PlayerStates/Paused";
import MidAirHide from "./PlayerStates/MidAirHide";
import { EaseFunctionType } from "../../../Wolfie2D/Utils/EaseFunctions";

export enum PlayerType {
    PLATFORMER = "platformer",
    TOPDOWN = "topdown"
}


export enum PlayerStates {
    IDLE = "idle",
    WALK = "walk",
    RUN = "run",
    JUMP = "jump",
    FALL = "fall",
    PREVIOUS = "previous",
    IN_BOX = "in_box",
    ATTACK = "attack",
    PAUSED = "paused",
    MIDAIR_HIDE = "midair_hide"

}

export default class PlayerController extends StateMachineAI {
    owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 200;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;
    attacking: Boolean = false;
    hiding: Boolean = false;
    paused: Boolean = false;
    gravity: number = 1000;

    initializeAI(owner: GameNode, options: Record<string, any>){
        this.owner = owner;

        this.initializePlatformer();

        this.receiver.subscribe(FUS_Events.EQUIP_BOX)
        this.receiver.subscribe(FUS_Events.REMOVE_BOX)
        this.receiver.subscribe(FUS_Events.ATTACK_FINISHED)
        this.receiver.subscribe(FUS_Events.PAUSE)
        this.receiver.subscribe(FUS_Events.UNPAUSE)

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        
        // Tween animations are added here
        // Event subscription can also be added here
        this.owner.tweens.add("caught", {
            startDelay: 0,
            duration: 2000,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_SINE
                },

                {
                    property: "rotation",
                    start: 0,
                    end: 6*Math.PI,
                    ease: EaseFunctionType.IN_SINE
                }

            ]

        })
    }

    initializePlatformer(): void {
        this.speed = 400;

        let idle = new Idle(this, this.owner);
		this.addState(PlayerStates.IDLE, idle);
		let walk = new Walk(this, this.owner);
		this.addState(PlayerStates.WALK, walk);
		let run = new Run(this, this.owner);
		this.addState(PlayerStates.RUN, run);
		let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        let inBox = new InBox(this, this.owner)
        this.addState(PlayerStates.IN_BOX, inBox)
        let attack = new Attack(this, this.owner)
        this.addState(PlayerStates.ATTACK, attack)
        let paused = new Paused(this, this.owner)
        this.addState(PlayerStates.PAUSED, paused)
        let midAirHide = new MidAirHide(this, this.owner)
        this.addState(PlayerStates.MIDAIR_HIDE, midAirHide)
        
        this.initialize(PlayerStates.IDLE);
    }

    changeState(stateName: string): void {
        // If we jump or fall, push the state so we can go back to our current state later
        // unless we're going from jump to fall or something
        if((stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) && !(this.stack.peek() instanceof InAir)){
            this.stack.push(this.stateMap.get(stateName));
        }

        // Dont let player equip box in mid air
        if((stateName === PlayerStates.IN_BOX) && !(this.stack.peek() instanceof InAir)){
            this.stack.push(this.stateMap.get(stateName))
        }

        if (this.paused && !(this.stack.peek() instanceof Paused)) {
            this.stack.pop();
            super.changeState(PlayerStates.PAUSED);
        }
        else
            super.changeState(stateName);
    }

    update(deltaT: number): void {
		super.update(deltaT);
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();

            switch(event.type){
                case FUS_Events.ATTACK_FINISHED:
                    {
                        this.changeState(PlayerStates.IDLE)
                    }
                    break;
                case FUS_Events.PAUSE:
                    {
                       // console.log('got pause');
                        this.changeState(PlayerStates.PAUSED);
                    }
                    break;
                case FUS_Events.UNPAUSE:
                    {
                       // console.log('got unpause');
                        this.changeState(PlayerStates.IDLE)
                    }
            }

        }
    }


}