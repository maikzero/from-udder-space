import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { FUS_Color } from "../fus_color";
import { FUS_Events } from "../fus_enums";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Input from "../../Wolfie2D/Input/Input";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import PlayerController from "../Player/PlayerController";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import BoxController from "../Objects/BoxController";

// TODO: Possible Player Stamina
// TODO: Puzzle elements, tasks to do before entering level end
// TODO: Enemy AI

export default class GameLevel extends Scene {
    // Player variables
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;

    // Lives counter
    protected static livesCount: number = 3;
    protected livesCountLabel: Label;

    // Level end area
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;

    // Screen fading timer
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    protected boxes: Array<BoxController>;

    startScene(): void {
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

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
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            // TODO, Event handling
            switch(event.type){
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
                            this.sceneManager.changeToScene(this.nextLevel, {}, {});
                        }
                    }
                    break;
            }
        }

        if(Input.isKeyJustPressed("E")){
            // Dropping the box
            if((<PlayerController>this.player._ai).hidden){
                this.emitter.fireEvent(FUS_Events.DROP_BOX)
            }

            // Trying to pick up box
            else{
                for (let box of this.boxes) {
                    if (this.player.collisionShape.overlaps(box.owner.collisionShape)) {
                        // We overlap it, try to pick it up
                        this.emitter.fireEvent(FUS_Events.PICKUP_BOX, { box: box })
                    }
                }
            }
        }
    }

    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("UI");

        // Add a layer for players and enemies
        this.addLayer("primary", 1);
    }

    // Needs to be overridden
    protected initBoxes(): void {

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
            FUS_Events.LEVEL_START
        ])
    }

    protected addUI(){
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

}