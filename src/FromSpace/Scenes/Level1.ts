import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2";
import Input from "../../Wolfie2D/Input/Input";
import PlayerController from "../Player/PlayerController";
import { FUS_Events } from "../fus_enums";

export default class Level1 extends GameLevel {
    
    // TODO: Add enemy sprites and various other sound effects
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "hw5_assets/tilemaps/level1.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/spike.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("level_music", "hw5_assets/music/scroller-music-2.mp3");
    }

    unloadScene(){
        this.resourceManager.keepSpritesheet("player")
        this.resourceManager.keepAudio("jump")
        this.resourceManager.keepAudio("player_death")
        this.resourceManager.keepAudio("level_music")
    }

    startScene(): void {
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        // TODO: Adding totals for tasks ie switches

        // TODO: Different Spawn
        this.playerSpawn = new Vec2(5*32, 14*32);

        super.startScene();

        // TODO: Different level end
        this.addLevelEnd(new Vec2(60, 13), new Vec2(5, 5));

        this.nextLevel = Level2;

        // TODO: Initialing enemy pools and positions

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}