import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Input from "../../Wolfie2D/Input/Input";
import Level6 from "./Level6";
import PlayerController from "../Controllers/Player/PlayerController";


export default class Level5 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level5", "final project assets/moon.json");
        this.load.spritesheet("player", "demo_assets/spritesheets/platformer/cow.json");
        this.load.spritesheet("alien", "demo_assets/spritesheets/platformer/alien.json");
        this.load.spritesheet("ufo", "demo_assets/spritesheets/platformer/ufo.json");
        this.load.audio("jump", "demo_assets/sounds/jump.wav");
        this.load.audio("fart", "demo_assets/sounds/fart.wav");
        this.load.audio("abduct", "demo_assets/sounds/abduct.wav");
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
    }

    startScene(): void {
        // Add the level 2 tilemap
        this.add.tilemap("level5", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 60*32, 24*32);
        this.pitDeath = 24*32

        this.playerSpawn = new Vec2(4*32, 15*32);
        this.caughtPosition = new Vec2(4*32, 15*32);

        super.startScene();
        this.nextLevel = Level6

        let aliensInitial = [{start: new Vec2(26, 16), left: 25, right: 26},
                        {start: new Vec2(14, 20), left: 12, right: 16},
                        {start: new Vec2(20, 5), left: 13, right: 27},
                        {start: new Vec2(37, 20), left: 33, right: 40},
                    ]

        aliensInitial.forEach((options) => {
            this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player, spawn: options.start, pitDeath: 24*32});
        })

        let ufosInitial = [{start: new Vec2(10, 1), left: 6, right: 14},
            {start: new Vec2(15, 1), left: 20, right: 30},
            {start: new Vec2(50, 1), left: 40, right: 60}]
        ufosInitial.forEach((options) => {
            this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

       this.addLevelEnd(new Vec2(57, 12), new Vec2(3, 3));

        

       // this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "music", loop: true, holdReference: true});
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
            this.sceneManager.changeToScene(Level6, {}, sceneOptions)
        }
    }
}