import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { FUS_Color } from "../fus_color";
import GameLevel from "./GameLevel";
import Input from "../../Wolfie2D/Input/Input";
import MainMenu from "./MainMenu";
import PlayerController from "../Controllers/Player/PlayerController";

export default class Level6 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level6", "final project assets/spaceship.json");
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
        this.add.tilemap("level6", new Vec2(1, 1));
        this.viewport.setBounds(0, 0, 60*32, 24*32);

        this.pitDeath = 24*32

        this.playerSpawn = new Vec2(4*32, 15*32);
        this.caughtPosition = new Vec2(4*32, 15*32);

        super.startScene();
        this.nextLevel = null

        this.addLevelEnd(new Vec2(1750/32, 656/32), new Vec2(2, 2));
        (<PlayerController>this.player._ai).gravity = 600

        let aliensInitial = [{start: new Vec2(23, 14), left: 20, right: 26},
            {start: new Vec2(23, 16), left: 22, right: 28},
            {start: new Vec2(48.5, 16), left: 48.5, right: 48.5},
            {start: new Vec2(44, 9), left: 40, right: 48},
            {start: new Vec2(41, 10), left: 40.5, right: 42},
        ]

        aliensInitial.forEach((options) => {
        this.addAlien("alien", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player, spawn: options.start, pitDeath: 24*32});
        })

        let ufosInitial = [{start: new Vec2(12, 1), left: 11, right: 16},
            {start: new Vec2(33, 1), left: 30, right: 37}]
        ufosInitial.forEach((options) => {
        this.addUFO("ufo", options.start, {leftLimit: options.left, rightLimit: options.right, player: this.player});
        }) 

       // this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
        
    }
}