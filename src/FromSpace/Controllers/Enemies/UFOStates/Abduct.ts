import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import UFOState from './UFOState'
import { UFOStates } from "../UFOController";
import PlayerController from "../../Player/PlayerController";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";

export default class Abduct extends UFOState {
    owner: AnimatedSprite;

    onEnter(options: Record<string, any>): void {
        this.owner.animation.play('abduct', true)
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "abduct", loop: false, holdReference: false});
	}
    update(deltaT: number): void {
        super.update(deltaT)
        this.parent.playerPos = this.parent.player.position.clone()
        this.parent.lastPlayerPos = this.parent.playerPos;
        let playerAI = <PlayerController>this.parent.player._ai
        if (this.parent.paused)
			this.finished(UFOStates.PAUSED)

        // if player is no longer visible/in range, or is now hiding, go back to patrol
        else if(this.parent.abducting === 0 || (playerAI.hiding)){
            this.finished(UFOStates.SCAN)
        }

        else{
            if(this.parent.playerPos.x > this.owner.position.x){
                this.parent.direction.x = 1;
                (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
            }
            else{
                this.parent.direction.x = -1;
                (<AnimatedSprite>this.owner).invertX = !(<AnimatedSprite>this.owner).invertX;
            }

            this.parent.velocity.x = this.parent.direction.x * this.parent.speed
		    this.owner.move(this.parent.velocity.scaled(deltaT));
        }
    }
    onExit(): Record<string, any> {
        this.owner.animation.stop();
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "abduct"});
		return {};
	}
}