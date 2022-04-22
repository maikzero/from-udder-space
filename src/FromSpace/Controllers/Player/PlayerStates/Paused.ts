import PlayerState from "./PlayerState";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class Paused extends PlayerState {
	owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
    }
    update(deltaT: number): void {

    }

    onExit(): Record<string, any> {
        return {}
    }

}

