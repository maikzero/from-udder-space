import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2";
import Input from "../../Wolfie2D/Input/Input";
import PlayerController from "../Controllers/Player/PlayerController";
import { FUS_Events } from "../fus_enums";

export default class Level1 extends GameLevel {
    
    // TODO: Add enemy sprites and various other sound effects
    loadScene(): void {
        // Load resources
        //this.load.tilemap("level1", "final_project_assets/.json");
        //this.load.tilemap("level1", "demo_assets/tilemaps/platformer/platformer.json");
        this.load.tilemap("level1", "final project assets/barn.json");
        this.load.spritesheet("player", "demo_assets/spritesheets/platformer/cow.json");
        this.load.spritesheet("alien", "final project assets/sprites/devils_flower_mantis.json");
        this.load.spritesheet("ufo", "final project assets/sprites/sentient_car.json");
        this.load.audio("jump", "demo_assets/sounds/jump.wav");
    }

    unloadScene(){
        this.resourceManager.keepSpritesheet("player")
        this.resourceManager.keepAudio("jump")
        this.resourceManager.keepTilemap("level1")
    }

    startScene(): void {
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 64*32, 24*32);

        // TODO: Adding totals for tasks ie switches

        // TODO: Different Spawn
        this.playerSpawn = new Vec2(5*32, 5*32);

        super.startScene();

        // TODO: Different level end
       // this.addLevelEnd(new Vec2(60, 13), new Vec2(5, 5));

        this.nextLevel = Level2;

        let aliensInitial = [{start: new Vec2(18, 1), left: 15, right: 20}
             //start: new Vec2(18, 8), left: new Vec2(15, 8), right: new Vec2(17, 8)},
                        
                        /*{start: new Vec2(18, 12), left: new Vec2(15, 12), right: new Vec2(17, 12)}*/]

        aliensInitial.forEach((options) => {
            this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

        let ufosInitial = [{start: new Vec2(10, 1), left: 6, right: 14}]
        ufosInitial.forEach((options) => {
            this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

        // TODO: Start positions for UFO's

        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}