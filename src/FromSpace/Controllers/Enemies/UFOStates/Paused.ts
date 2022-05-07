import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import UFOState from './UFOState'
import { UFOStates } from "../UFOController";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export default class Paused extends UFOState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('moving', true)
        this.parent.speed = 0
        console.log('UFO Paused');
	}
    update(deltaT: number): void {
        super.update(deltaT)
        this.owner.move(new Vec2(0,0))
        if (!this.parent.paused) 
            this.finished(UFOStates.SCAN)
    }
    onExit(): Record<string, any> {
        console.log("UFO Unpaused")
        this.parent.speed = 100
        this.owner.animation.stop();
		return {};
	}
}