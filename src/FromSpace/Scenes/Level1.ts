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
        this.load.tilemap("level1", "final project assets/barn.json");
        this.load.spritesheet("player", "demo_assets/spritesheets/platformer/cow.json");
        this.load.spritesheet("alien", "demo_assets/spritesheets/platformer/alien.json");
        this.load.spritesheet("ufo", "demo_assets/spritesheets/platformer/ufo.json");
        this.load.audio("jump", "demo_assets/sounds/jump.wav");
        this.load.audio("abduct", "demo_assets/sounds/abduct.wav");
        this.load.audio("caught", "demo_assets/sounds/caught.wav");
        this.load.audio("fart", "demo_assets/sounds/fart.wav");
        this.load.audio("music", "demo_assets/sounds/game-music.mp3");
    }

    unloadScene(){
        this.resourceManager.keepSpritesheet("player")
        this.resourceManager.keepSpritesheet("alien")
        this.resourceManager.keepSpritesheet("ufo")
        this.resourceManager.keepAudio("jump")
        this.resourceManager.keepAudio("abduct")
        this.resourceManager.keepAudio("caught")
        this.resourceManager.keepAudio("fart")
        this.resourceManager.keepAudio("music") 
    }

    startScene(): void {
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 64*32, 24*32);

        // TODO: Adding totals for tasks ie switches

        // TODO: Different Spawn
        this.playerSpawn = new Vec2(5*32, 5*32);
        this.caughtPosition = new Vec2(0, 0)

        super.startScene();

        this.nextLevel = Level2;

        let aliensInitial = [{start: new Vec2(17, 4), left: 17, right: 17},
                        {start: new Vec2(11, 17), left: 9, right: 11.5},
                        {start: new Vec2(24, 14), left: 23, right: 25.5},
                        {start: new Vec2(34.5, 14), left: 34, right: 36},
                        {start: new Vec2(43, 7), left: 41.25, right: 46},
                        {start: new Vec2(52, 13), left: 50, right: 55},
                    ]

        aliensInitial.forEach((options) => {
            this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

        let ufosInitial = [{start: new Vec2(10, 1), left: 6, right: 14},
            {start: new Vec2(15, 1), left: 20, right: 30}]
        ufosInitial.forEach((options) => {
            this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

        // TODO: Start positions for UFO's

        this.addLevelEnd(new Vec2(62,18), new Vec2(2, 2))

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "music", loop: true, holdReference: true});

    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
        if (Input.isKeyJustPressed("n")) {
            console.log("Skipping to next level")
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "alien", "ufo", "ray"],
                    collisions:
                    [
                        [0, 1, 1, 1, 1],
                        [1, 0, 0, 0, 0],
                        [1, 0, 0, 1, 1],
                        [1, 0, 1, 0, 1],
                        [1, 0, 1, 1, 0],

                    ]
                }
            }
            this.sceneManager.changeToScene(Level2, {}, sceneOptions)
        }

    }
}