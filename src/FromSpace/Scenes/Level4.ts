import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Level5 from "./Level5";
import Input from "../../Wolfie2D/Input/Input";
import MainMenu from "./MainMenu";

export default class Level4 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level4", "final project assets/space.json");
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
        this.add.tilemap("level4", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 60*32, 60*32);

        this.playerSpawn = new Vec2(30*32, 40*32);
        this.caughtPosition = new Vec2(30*32, 40*32);

        super.startScene();
        this.nextLevel = Level5

        let aliensInitial = [{start: new Vec2(24, 31), left: 20, right: 29},
                        {start: new Vec2(23, 19), left: 18, right: 28},
                        {start: new Vec2(48.5, 21), left: 48.5, right: 48.5},
                        {start: new Vec2(44, 9), left: 40, right: 48},
                    ]

        aliensInitial.forEach((options) => {
            this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        })

        let ufosInitial = [{start: new Vec2(10, 5), left: 2, right: 22},
                            {start: new Vec2(49, 6), left: 43, right: 56}]
        ufosInitial.forEach((options) => {
            this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        }) 

       this.addLevelEnd(new Vec2(61, 22), new Vec2(3, 3));

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
            this.sceneManager.changeToScene(Level5, {}, sceneOptions)
        }
    }
}