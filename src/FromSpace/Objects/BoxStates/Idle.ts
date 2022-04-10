import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import BoxState from "./BoxState";

export default class Idle extends BoxState {
    onEnter(): void {
        this.parent.velocity = Vec2.ZERO
        this.parent.direction = Vec2.ZERO
        this.parent.speed = 0;
        (<AnimatedSprite>this.owner).animation.play("IDLE", true);
    }

    update(deltaT: number): void {

    }

    onExit(): Record<string, any> {
        (<AnimatedSprite>this.owner).animation.stop();
		return {};
    }
}