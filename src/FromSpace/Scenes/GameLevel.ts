import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import AlienController from "../Controllers/Enemies/AlienController";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { FUS_Color } from "../fus_color";
import { FUS_Events } from "../fus_enums";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Input from "../../Wolfie2D/Input/Input";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import PlayerController from "../Controllers/Player/PlayerController";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Layer from "../../Wolfie2D/Scene/Layer";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import UFOController from "../Controllers/Enemies/UFOController";
import MainMenu from "./MainMenu";
import AbductionRayController from "../Controllers/Enemies/AbductionRayController";
import List from "../../Wolfie2D/DataTypes/List";
import EnemyController from "../Controllers/Enemies/EnemyController";

// TODO: Puzzle elements, tasks to do before entering level end
// TODO: Enemy AI

export default class GameLevel extends Scene {
    // Player variables
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    invincible: Boolean;
    protected respawnTimer: Timer;

    // Enemy variables
    protected alien: AnimatedSprite;
    protected ufo: AnimatedSprite;

    protected enemies: EnemyController[];

    // Lives counter
    protected static livesCount: number = 20;
    protected livesCountLabel: Label;

    // Level end area
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;

    // Screen fading timer
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    // In game timer
    protected gameTimerLabel: Label;
    protected timeLeft: number = 10000

    // Pause Screen
    protected pause: Layer;
    protected isPaused: Boolean;

    // Controls Screen
    protected controls: Layer;

    startScene(): void {
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

        this.isPaused = false;
        this.pause.setHidden(true);
        this.controls.setHidden(true);

        this.respawnTimer = new Timer(1000, () => {
            (<PlayerController>this.player._ai).hiding = false
            this.player.position = this.playerSpawn.clone()
            this.player.visible = true
            this.player.enablePhysics();
            Input.enableInput();
            this.player.isCollidable = true
            this.player.unfreeze();
        });

        this.enemies = []


        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");

        // Initially disable player movement
        Input.disableInput();
    }

    updateScene(deltaT: number){
        this.timeLeft -= deltaT
        this.gameTimerLabel.text = (Math.round(this.timeLeft * 100) / 100).toFixed(2).toString()

        if(this.timeLeft <= 0){
            GameLevel.livesCount = 20
            this.sceneManager.changeToScene(MainMenu);
        }

        if (Input.isJustPressed("pause")) {
            if (this.isPaused) 
                this.emitter.fireEvent(FUS_Events.UNPAUSE);
            else
                this.emitter.fireEvent(FUS_Events.PAUSE);
        }
        
        if (Input.isKeyJustPressed("i")) {
            //(<UFOController>this.ufo.ai).invincible = true;
            this.invincible = true;
            console.log("Invincible");
        }
        if (Input.isKeyJustPressed("u")) {
            //(<UFOController>this.ufo.ai).invincible = false;
            this.invincible = false;
            console.log("Uninvincible");
        }

        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            // TODO, Event handling
            console.log(event.type);
            switch(event.type){
                case 'main menu':
                    {
                        let size = this.viewport.getHalfSize();
                        this.viewport.setFocus(size.mult(new Vec2(2,2)));
                        this.sceneManager.changeToScene(MainMenu, {});
                    }
                    break;
                case 'controls':
                    {
                        this.controls.setHidden(false);
                        this.pause.setHidden(true);
                    }
                    break;
                case 'controlsBack':
                    {
                        this.controls.setHidden(true);
                        this.pause.setHidden(false);
                    }
                    break;
                case FUS_Events.PAUSE:
                    {
                        //Input.disableKeyInput();
                        console.log("PAUSED")
                        this.pause.setHidden(false);
                        this.isPaused = true;
                        (<PlayerController>this.player._ai).paused = true;

                        this.enemies.forEach((enemy: EnemyController) => {
                            enemy.paused = true
                        });
                    }
                    break;
                case FUS_Events.UNPAUSE:
                    {
                        console.log("UNPAUSED");
                        //Input.enableKeyInput();
                        this.isPaused = false;
                        this.pause.setHidden(true);
                        this.controls.setHidden(true);
                        (<PlayerController>this.player._ai).paused = false;

                        this.enemies.forEach((enemy: EnemyController) => {
                            enemy.paused = false
                        });
                    }
                    break;
                case FUS_Events.PLAY_HIDE:
                    {
                        this.player.animation.playIfNotAlready("hiding", true)
                    }
                    break;
                case FUS_Events.ATTACK_FINISHED:
                    {
                        (<PlayerController>this.player._ai).attacking = false;
                        (<PlayerController>this.player._ai).attackRegion = null;
                        //this.sceneGraph.removeNode((<PlayerController>this.player._ai).attackRegion)
                        
                    }
                    break;

                case FUS_Events.FINISHED_HIDING:
                    {
                        (<PlayerController>this.player._ai).hiding = false
                    }   
                    break 
                // Level end area assumes the sole goal is just to get to this area, once entered, level is over
                case FUS_Events.PLAYER_ENTERED_LEVEL_END:
                    {   
                        if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
                            // The player has reached the end of the level
                            this.levelEndTimer.start();
                            this.levelEndLabel.tweens.play("slideIn");
                        }
                    }
                    break;

                case FUS_Events.LEVEL_START:
                    {
                        // Re-enable controls
                        Input.enableInput();
                    }
                    break;
                
                case FUS_Events.LEVEL_END:
                    {
                        // Go to the next level
                        if(this.nextLevel){
                            let sceneOptions = {
                                physics: {
                                    groupNames: ["ground", "player", "alien", "ufo", "ray"],
                                    collisions:
                                    [
                                        [0, 1, 1, 1, 1],
                                        [1, 0, 1, 0, 0],
                                        [1, 1, 0, 1, 1],
                                        [1, 0, 1, 0, 1],
                                        [1, 0, 1, 1, 0],

                                    ]
                                }
                            }
                            this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                        }
                    }
                    break;

                    case FUS_Events.ALIEN_STUNNED:
                    {
                        console.log('hit player')
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));

                        var alienSprite
                        var attackRegionSprite
                        
                        if(node === (<PlayerController>this.player._ai).attackRegion){
                            // Node is player, other is balloon
                            alienSprite = <AnimatedSprite>other
                            attackRegionSprite = <AnimatedSprite>node
                        }
                        else {
                            // Other is player, node is balloon
                            alienSprite = <AnimatedSprite>node
                            attackRegionSprite = <AnimatedSprite>other
                        }

                        if((<PlayerController>this.player._ai).attackRegion?.isCollidable){
                            (<AlienController>alienSprite._ai).stunned = true;
                        }
                        // cleans up hanging attack regions
                        else{
                            if(attackRegionSprite.isCollidable){
                                attackRegionSprite.disablePhysics()
                                attackRegionSprite.isCollidable = false
                                this.remove(attackRegionSprite);
                                attackRegionSprite.destroy()
                                attackRegionSprite = null
                            }
                        }
                    }
                    break;

                    case FUS_Events.ALIEN_HIT_PLAYER: 
                    {   
                        if (this.invincible)
                            break;
                        console.log('hit player')
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));

                        var alienSprite
                        var playerSprite
                        
                        if(node === this.player){
                            // Node is player, other is balloon
                            alienSprite = <AnimatedSprite>other
                            playerSprite = <AnimatedSprite>node
                        } else {
                            // Other is player, node is balloon
                            alienSprite = <AnimatedSprite>node
                            playerSprite = <AnimatedSprite>other
                        }

                        

                        this.handlePlayerAlienCollision(playerSprite, alienSprite);
                    }
                    break;
                    
                    case FUS_Events.PLAYER_CAUGHT: 
                    {   
                        console.log('caught')
                        GameLevel.livesCount--;
                        this.livesCountLabel.text = "Lives Left: " + GameLevel.livesCount
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "caught", loop: false, holdReference: false});
                       // this.player.tweens.play("caught");
                        Input.disableInput();
                        this.player.disablePhysics();
                        this.player.position.x = 0;
                        this.player.position.y = 0
                        this.player.visible = false
                        this.player.isCollidable = false

                        if(GameLevel.livesCount === 0){
                            GameLevel.livesCount = 20
                            this.sceneManager.changeToScene(MainMenu);
                        }

                        else{
                            this.respawnTimer.start()
                        }
                    }
                    break;

                    case FUS_Events.UNLOAD_ASSET: 
                    {
                        let asset = this.sceneGraph.getNode(event.data.get("node"));
                        asset.destroy();
                    }
                    break;
            }
        }
    }

    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("UI");

        // Add a layer for Pause screen
        this.pause = this.addUILayer("pause");

        // Add a layer for the Controls screen
        this.controls = this.addUILayer("controls");

        // Add a layer for players and enemies
        this.addLayer("primary", 1);
    }


    /**
     * Initializes the viewport
     */
    protected initViewport(): void {
        this.viewport.setZoomLevel(2);
    }

    /**
     * Handles all subscriptions to events
     */
    protected subscribeToEvents(){
        this.receiver.subscribe([
            FUS_Events.PLAYER_ENTERED_LEVEL_END,
            FUS_Events.LEVEL_END,
            FUS_Events.LEVEL_START,
            FUS_Events.PLAY_HIDE,
            FUS_Events.PAUSE,
            FUS_Events.ATTACK_FINISHED,
            FUS_Events.FINISHED_HIDING,
            FUS_Events.UNPAUSE,
            FUS_Events.ALIEN_HIT_PLAYER,
            FUS_Events.PLAYER_CAUGHT,
            FUS_Events.UNLOAD_ASSET,
            FUS_Events.ALIEN_STUNNED,
            'controls',
            'controlsBack',
            'main menu'
        ]);
    }

    protected addUI(){
        // Pause Screen
        this.viewport.setCenter(600,400);
        const center = this.viewport.getCenter();
        

        let pauseBack = <Button>this.add.uiElement(UIElementType.BUTTON, "pause", {position: new Vec2(center.x / 2, (center.y / 2) + 50), text: "Back"});
        pauseBack.size.set(200, 50);
        pauseBack.borderWidth = 2;
        pauseBack.borderColor = Color.WHITE;
        pauseBack.backgroundColor = Color.BLACK;
        pauseBack.onClickEventId = FUS_Events.UNPAUSE;

        let controls = <Button>this.add.uiElement(UIElementType.BUTTON, "pause", {position: new Vec2(center.x / 2, (center.y / 2) - 50), text: "Controls"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.WHITE;
        controls.backgroundColor = Color.BLACK;
        controls.onClickEventId = 'controls';

        let home = <Button>this.add.uiElement(UIElementType.BUTTON, "pause", {position: new Vec2(center.x / 2, center.y / 2), text: "Main Menu"});
        home.size.set(200, 50);
        home.borderWidth = 2;
        home.borderColor = Color.WHITE;
        home.backgroundColor = Color.BLACK;
        home.onClickEventId = 'main menu';


        const controlsBackground = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, center.y / 2), text: ''});
        controlsBackground.size.set(600, 700);
        controlsBackground.backgroundColor = Color.BLACK;

        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) - 125), text: "Controls"});
        controlsHeader.textColor = Color.WHITE;
        controlsHeader.fontSize = 45;

        const controls1 = "WAD to Move"
        const controls2 = "E to Hide under Box"
        const controls3 = "R to Remove Box"
        const controls4 = "Q to Fart"
        const controls5 = "I/U to Turn On/Off Invincibility"
        const controls6 = "N to Skip to Next Level"

        const control_line1 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) - 60), text: controls1});
        const control_line2 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) - 40), text: controls2});
        const control_line3 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) - 20), text: controls3});
        const control_line4 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2)), text: controls4});
        const control_line5 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) + 20), text: controls5});
        const control_line6 = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(center.x / 2, (center.y / 2) + 40), text: controls6});
        

        control_line1.textColor = Color.WHITE;
        control_line2.textColor = Color.WHITE;
        control_line3.textColor = Color.WHITE;
        control_line4.textColor = Color.WHITE;
        control_line5.textColor = Color.WHITE;
        control_line6.textColor = Color.WHITE;
 

        const controlBack = this.add.uiElement(UIElementType.BUTTON, "controls", {position: new Vec2(center.x / 2, (center.y / 2) + 100), text: "Back"});
        controlBack.size.set(200, 50);
        controlBack.borderWidth = 2;
        controlBack.borderColor = Color.WHITE;
        controlBack.backgroundColor = Color.BLACK;
        controlBack.onClickEventId = "controlsBack";

        // IN GAME UI
        this.livesCountLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(80, 30), text: "Lives Left: " + (GameLevel.livesCount)});
        this.livesCountLabel.textColor = Color.BLACK
        this.livesCountLabel.font = "PixelSimple";

        this.gameTimerLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(570, 30), text: "Lives: " + GameLevel.livesCount});
        this.gameTimerLabel.textColor = Color.BLACK;
        this.gameTimerLabel.font = "PixelSimple";


        // End of level label (start off screen)
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(-300, 200), text: "Level Complete"});
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";

        // Add a tween to move the label on screen
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: -300,
                    end: 300,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        });


        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "UI", {position: new Vec2(300, 200), size: new Vec2(600, 400)});
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: FUS_Events.LEVEL_END
        });

        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: FUS_Events.LEVEL_START
        });


    }

    protected initPlayer(): void {
        // Add the player
        this.player = this.add.animatedSprite("player", "primary");
        this.player.scale.set(2, 2);
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);
        this.invincible = false;

        // TODO, Might have to switch up this AABB initialization
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main", color: FUS_Color.RED});

        this.player.setGroup("player");

        this.viewport.follow(this.player);
    }

    protected addLevelEnd(startingTile: Vec2, size: Vec2): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, "primary", {position: startingTile.scale(32), size: size.scale(32)});
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger("player", FUS_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(0, 0, 0, 0);
    }
    
    protected addAlien(spriteKey: string, tilePos: Vec2, aiOptions: Record<string, any>): void {
        let alien = this.add.animatedSprite(spriteKey, "primary");

        alien.isCollidable = true;
        alien.position.set(tilePos.x*32, tilePos.y*32);
        alien.scale.set(2, 2);
        alien.addPhysics();
        alien.addAI(AlienController, aiOptions);
        alien.setTrigger('player', FUS_Events.ALIEN_HIT_PLAYER, null)
        alien.setGroup("alien");

        this.enemies.push(<EnemyController>alien._ai)
    }

    protected addUFO(spriteKey: string, tilePos: Vec2, aiOptions: Record<string, any>): void {
        let ufo = this.add.animatedSprite(spriteKey, "primary");

        ufo.isCollidable = true;
        ufo.position.set(tilePos.x*32, tilePos.y*32);
        ufo.scale.set(2, 2);
        ufo.addPhysics();
        ufo.addAI(UFOController, aiOptions);
        ufo.setTrigger('player', FUS_Events.ALIEN_HIT_PLAYER, null)
        ufo.setGroup("ufo");

        this.enemies.push(<EnemyController>ufo._ai)
    }

    protected handlePlayerAlienCollision(player: AnimatedSprite, alien: AnimatedSprite){
        if(typeof alien !== 'undefined'){
            if(this.player.isCollidable && !(<AlienController>alien._ai).stunned){
                this.emitter.fireEvent(FUS_Events.PLAYER_CAUGHT)
            }
        }
    }

    goToLevel(level: new (...args: any) => GameLevel): void{
        let sceneOptions = {
            physics: {
                groupNames: ["ground", "player", "alien", "ufo", "ray"],
                collisions:
                [
                    [0, 1, 1, 1, 1],
                    [1, 0, 1, 0, 0],
                    [1, 1, 0, 1, 1],
                    [1, 0, 1, 0, 1],
                    [1, 0, 1, 1, 0],

                ]
            }
        }
        this.sceneManager.changeToScene(level, {}, sceneOptions);
    }

}