import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./Level1";

export default class MainMenu extends Scene {

    animatedSprite: AnimatedSprite;

    loadScene(): void {
        // Load the menu song
        this.load.audio("menu", "hw5_assets/music/scroller-music-2.mp3");
    }

    startScene(): void {
        this.addUILayer("Main");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        // TODO UI Building for different menu's goes here

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu"});
    }
}