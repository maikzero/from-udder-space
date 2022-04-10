import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Layer from "../../Wolfie2D/Scene/Layer";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Level1 from "./Level1";


export default class MainMenu extends Scene {

    animatedSprite: AnimatedSprite;
    private mainMenu: Layer;
    private about: Layer;
    private control: Layer;
    private cow: Sprite;
    private alien: Sprite;
    private title: Label;

    loadScene(): void {
        // Load the menu song and images
        //this.load.audio("menu", "hw5_assets/music/scroller-music-2.mp3");
        this.load.image("cow", "demo_assets/images/Cow_face.png");
        this.load.image("alien", "demo_assets/images/Alien_face.png");
    }

    startScene(): void {
        this.mainMenu = this.addUILayer("mainMenu");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        const center = this.viewport.getCenter();

        this.viewport.setZoomLevel(1);

        // TODO UI Building for different menu's goes here
        // Add cow and alien logos
        this.cow = this.add.sprite("cow", "mainMenu");
        this.alien = this.add.sprite("alien", "mainMenu");

        this.cow.position.set(center.x - 200, center.y - 80);
        this.alien.position.set(center.x + 200, center.y - 45);

        this.title= <Label>this.add.uiElement(UIElementType.LABEL, "mainMenu", {position: new Vec2(center.x, center.y - 225), text: "From Udder Space"});
        this.title.size.set(1200, 60);
        this.title.borderRadius = 0;
        this.title.textColor = Color.BLACK;
        this.title.fontSize = 48;
        this.title.font = "VT323";


        // Add play button, and give it an event to emit on press
        const play = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x - 200, center.y + 75), text: "Play"});
        play.size.set(200, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.TRANSPARENT;
        play.onClickEventId = "play";

        // Add level select button
        const level_select = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x + 200, center.y + 75), text: "Level Select"});
        level_select.size.set(200, 50);
        level_select.borderWidth = 2;
        level_select.borderColor = Color.WHITE;
        level_select.backgroundColor = Color.TRANSPARENT;
        level_select.onClickEventId = "level_select";


        // Add about button
        const about = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x - 200, center.y + 175), text: "About"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.WHITE;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClickEventId = "about";

        /* ########## ABOUT SCREEN ########## */
        this.about = this.addUILayer("about");
        this.about.setHidden(true);

        const aboutHeader = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 250), text: "About"});
        aboutHeader.textColor = Color.WHITE;

        const text1 = "This game was created by Peter Christensen, Kevin Mai, and Jacob Richichi";
        const text2 = "using the Wolfie2D game engine, a TypeScript game engine created by";
        const text3 = "Joe Weaver and Richard McKenna.";

        const line1 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 50), text: text1});
        const line2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y), text: text2});
        const line3 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 50), text: text3});

        line1.textColor = Color.WHITE;
        line2.textColor = Color.WHITE;
        line3.textColor = Color.WHITE;

        const aboutBack = this.add.uiElement(UIElementType.BUTTON, "about", {position: new Vec2(center.x, center.y + 250), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderWidth = 2;
        aboutBack.borderColor = Color.WHITE;
        aboutBack.backgroundColor = Color.TRANSPARENT;
        aboutBack.onClickEventId = "menu";

        // Add controls button
        const control = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x + 200, center.y + 175), text: "Controls"});
        control.size.set(200, 50);
        control.borderWidth = 2;
        control.borderColor = Color.WHITE;
        control.backgroundColor = Color.TRANSPARENT;
        control.onClickEventId = "control"; 
        
        this.control = this.addUILayer("control");
        this.control.setHidden(true);

        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        aboutHeader.textColor = Color.WHITE;

        const controls1 = "Right Click to move"
        const controls2 = "E to pick up item"
        const controls3 = "Q to drop item"
        const controls4 = "1 and 2 keys to select inventory item"
        const controls5 = "Z and X to swap between characters"

        const control_line1 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 150), text: controls1});
        const control_line2 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 100), text: controls2});
        const control_line3 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 50), text: controls3});
        const control_line4 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y), text: controls4});
        const control_line5 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y + 50), text: controls5});

        control_line1.textColor = Color.WHITE;
        control_line2.textColor = Color.WHITE;
        control_line3.textColor = Color.WHITE;
        control_line4.textColor = Color.WHITE;
        control_line5.textColor = Color.WHITE;

        const controlBack = this.add.uiElement(UIElementType.BUTTON, "control", {position: new Vec2(center.x, center.y + 250), text: "Back"});
        controlBack.size.set(200, 50);
        controlBack.borderWidth = 2;
        controlBack.borderColor = Color.WHITE;
        controlBack.backgroundColor = Color.TRANSPARENT;
        controlBack.onClickEventId = "menu";
    

        // Subscribe to the button events
        this.receiver.subscribe("play");
        this.receiver.subscribe("about");
        this.receiver.subscribe("menu");
        this.receiver.subscribe("control");
        this.receiver.subscribe("level_seelct")

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
    }
    updateScene(){
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();

            console.log(event);

            /*if(event.type === "play"){
                this.sceneManager.changeToScene(hw4_scene, {});
            }*/

            if(event.type === "about"){
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
            }

            if(event.type === "menu"){
                this.mainMenu.setHidden(false);
                this.about.setHidden(true);
                this.control.setHidden(true);
            }
            if(event.type === "control"){
                this.mainMenu.setHidden(true);
                this.control.setHidden(false);
            }

        }
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu"});
    }
}