import PlayerState from "./PlayerState";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { PlayerStates } from "../PlayerController";

export default class Paused extends PlayerState {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        console.log("Player Paused");
    }
    update(deltaT: number): void {
        if (!this.parent.paused) 
            this.finished(PlayerStates.IDLE)
    }

    onExit(): Record<string, any> {
        console.log("Player Unpaused")
        return {}
    }

}

