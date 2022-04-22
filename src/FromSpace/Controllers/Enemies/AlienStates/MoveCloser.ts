import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AlienState from './AlienState'

export default class MoveCloser extends AlienState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {

	}

    update(deltaT: number): void {

    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
		return {};
	}
}