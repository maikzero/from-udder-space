import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import BoxState from "./BoxState";

export default class InUse extends BoxState {
    onEnter(): void {
        this.parent.velocity = this.parent.player._velocity.clone();
        //this.parent.speed = this.parent.player;
        (<AnimatedSprite>this.owner).animation.play("IN_USE", true);
    }

    update(deltaT: number): void {
        this.parent.velocity = this.parent.player._velocity.clone();
    }

    onExit(): Record<string, any> {
        (<AnimatedSprite>this.owner).animation.stop();
        return {};
    }
}