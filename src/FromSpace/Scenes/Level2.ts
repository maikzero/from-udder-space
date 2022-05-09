import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Input from "../../Wolfie2D/Input/Input";
import Level3 from "./Level3";

export default class Level2 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level2", "final project assets/outsidebarn.json");
        this.load.spritesheet("player", "demo_assets/spritesheets/platformer/cow.json");
        this.load.spritesheet("alien", "demo_assets/spritesheets/platformer/alien.json");
        this.load.spritesheet("ufo", "demo_assets/spritesheets/platformer/ufo.json");
        this.load.audio("jump", "demo_assets/sounds/jump.wav");
        this.load.audio("abduct", "demo_assets/sounds/abduct.wav");
        this.load.audio("fart", "demo_assets/sounds/fart.wav");
        this.load.audio("caught", "demo_assets/sounds/caught.wav");
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
        // Add the level 2 tilemap
        this.add.tilemap("level2", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 64*32, 24*32);
        this.pitDeath = 24*32

        this.playerSpawn = new Vec2(4*32, 15*32);
        this.caughtPosition = new Vec2(4*32, 15*32);

        super.startScene();
        this.nextLevel = Level3
        
        let aliensInitial = [{start: new Vec2(49, 6), left: 15, right: 24},
                        {start: new Vec2(42, 22), left: 36, right: 48},
                        {start: new Vec2(48.5, 21), left: 48.5, right: 48.5},
                        {start: new Vec2(44, 9), left: 40, right: 48},
                    ]

        aliensInitial.forEach((options) => {
            this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player, spawn: options.start, pitDeath: 24*32});
        })

        let ufosInitial = [{start: new Vec2(33, 0), left: 23, right: 45}]
        ufosInitial.forEach((options) => {
            this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        }) 

        this.addLevelEnd(new Vec2(61, 22), new Vec2(3, 3));

        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "music", loop: true, holdReference: true});
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
                        [1, 0, 1, 1, 0]

                    ]
                }
            }
            this.sceneManager.changeToScene(Level3, {}, sceneOptions)
        }
    }
}