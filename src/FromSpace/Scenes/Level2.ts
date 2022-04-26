import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";

export default class Level2 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level2", "final project assets/level2.json");
        /*this.load.spritesheet("player", "hw5_assets/spritesheets/spike.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");*/
    }

    startScene(): void {
        // Add the level 2 tilemap
        this.add.tilemap("level2", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 64*32, 24*32);

        this.playerSpawn = new Vec2(4*32, 15*32);

        super.startScene();

       // this.addLevelEnd(new Vec2(60, 12), new Vec2(2, 2));

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}