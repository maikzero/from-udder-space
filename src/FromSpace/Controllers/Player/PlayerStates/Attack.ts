import Input from "../../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { FUS_Events } from "../../../fus_enums";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";
import OnGround from "./OnGround";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import Rect from "../../../../Wolfie2D/Nodes/Graphics/Rect";
import GameLevel from "../../../Scenes/GameLevel";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { GameEventType } from "../../../../Wolfie2D/Events/GameEventType";


export default class Attack extends PlayerState {
    owner: AnimatedSprite;
   // timer: Timer


    onEnter(options: Record<string, any>): void {
        let behindAdder = -32
        if(this.owner.invertX){
            behindAdder = 32
        }
        this.parent.addAttackRegion(new Vec2(this.owner.position.x + behindAdder, this.owner.position.y), new Vec2(20,20))
        this.owner.animation.play('fart', false, FUS_Events.ATTACK_FINISHED)
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "fart", loop: false, holdReference: false});
        this.parent.attacking = true
        //this.timer = new Timer(5000)
        //this.timer.start()
	}

    update(deltaT: number): void {
        if(this.parent.velocity.y > 0){
			this.parent.velocity.y = 0;
		}
        super.update(deltaT)
        this.parent.velocity.x = 0;
        if(!this.parent.attacking){
            this.finished(PlayerStates.IDLE)
        }

        // if(this.timer.isStopped()){
        //     this.parent.attacking = false
        // }
    }

    onExit(): Record<string, any> {
        this.parent.removeAttackRegion()
        return { }
    }
}