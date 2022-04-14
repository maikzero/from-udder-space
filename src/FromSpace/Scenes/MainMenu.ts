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
import Input from "../../Wolfie2D/Input/Input";


export default class MainMenu extends Scene {

    animatedSprite: AnimatedSprite;
    private startScreen: Layer;
    private mainMenu: Layer;
    private about: Layer;
    private control: Layer;
    private level_select: Layer;
    private cow: Sprite;
    private alien: Sprite;
    private logo: Sprite;
    private title: Label;

    loadScene(): void {
        // Load the menu song and images
        //this.load.audio("menu", "hw5_assets/music/scroller-music-2.mp3");
        this.load.image("cow", "demo_assets/images/Cow_face.png");
        this.load.image("alien", "demo_assets/images/Alien_face.png");
        this.load.image("logo", "demo_assets/images/Cow_Logo.png");
    }

    startScene(): void {
        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        const center = this.viewport.getCenter();
 
        this.viewport.setZoomLevel(1);

        this.startScreen = this.addUILayer("start");
        this.logo = this.add.sprite("logo", "start");
        this.logo.position.set(center.x, center.y - 80);

        this.title= <Label>this.add.uiElement(UIElementType.LABEL, "start", {position: new Vec2(center.x, center.y + 150), text: "From Udder Space"});
        this.title.borderRadius = 0;
        this.title.textColor = Color.BLACK;
        this.title.fontSize = 60;
        this.title.font = "VT323";

        const start = this.add.uiElement(UIElementType.BUTTON, "start", {position: new Vec2(center.x, center.y + 250), text: "Start"});
        start.size.set(200, 50);
        start.borderWidth = 2;
        start.borderColor = Color.WHITE;
        start.backgroundColor = Color.BLACK;
        start.onClickEventId = "menu";


        this.mainMenu = this.addUILayer("mainMenu");
        this.mainMenu.setHidden(true);

        // TODO UI Building for different menu's goes here
        // Add cow and alien logos
        this.cow = this.add.sprite("cow", "mainMenu");
        this.alien = this.add.sprite("alien", "mainMenu");

        this.cow.position.set(center.x - 200, center.y - 80);
        this.alien.position.set(center.x + 200, center.y - 45);

        /*
        this.title= <Label>this.add.uiElement(UIElementType.LABEL, "mainMenu", {position: new Vec2(center.x, center.y - 225), text: "From Udder Space"});
        this.title.borderRadius = 0;
        this.title.textColor = Color.BLACK;
        this.title.fontSize = 48;
        this.title.font = "VT323";
        */


        // Add play button, and give it an event to emit on press
        const play = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x - 200, center.y + 75), text: "Play"});
        play.size.set(200, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.BLACK;
        play.onClickEventId = "play";

        // Add level select button
        const level_select = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x + 200, center.y + 75), text: "Level Select"});
        level_select.size.set(200, 50);
        level_select.borderWidth = 2;
        level_select.borderColor = Color.WHITE;
        level_select.backgroundColor = Color.BLACK;
        level_select.onClickEventId = "level_select";

         /* ########## LEVEL SELECT SCREEN ########## */
        this.level_select = this.addUILayer("level_select");
        this.level_select.setHidden(true);
        
        const levelHeader = <Label>this.add.uiElement(UIElementType.LABEL, "level_select", {position: new Vec2(center.x, center.y - 250), text: "Level Select"});
        levelHeader.textColor = Color.BLACK;
        levelHeader.fontSize = 45;

        const level1 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x - 200, center.y - 120), text: "Level 1"});
        level1.size.set(200, 50);
        level1.borderWidth = 2;
        level1.borderColor = Color.WHITE;
        level1.backgroundColor = Color.BLACK;
        level1.onClickEventId = "level1";

        const level2 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x + 200, center.y - 120), text: "Level 2"});
        level2.size.set(200, 50);
        level2.borderWidth = 2;
        level2.borderColor = Color.WHITE;
        level2.backgroundColor = Color.BLACK;
        level2.onClickEventId = "level2";

        const level3 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x - 200, center.y - 20), text: "Level 3"});
        level3.size.set(200, 50);
        level3.borderWidth = 2;
        level3.borderColor = Color.WHITE;
        level3.backgroundColor = Color.BLACK;
        level3.onClickEventId = "level3";

        const level4 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x + 200, center.y - 20), text: "Level 4"});
        level4.size.set(200, 50);
        level4.borderWidth = 2;
        level4.borderColor = Color.WHITE;
        level4.backgroundColor = Color.BLACK;
        level4.onClickEventId = "level4";

        const level5 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x - 200, center.y + 80), text: "Level 5"});
        level5.size.set(200, 50);
        level5.borderWidth = 2;
        level5.borderColor = Color.WHITE;
        level5.backgroundColor = Color.BLACK;
        level5.onClickEventId = "level5";

        const level6 = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x + 200, center.y + 80), text: "Level 6"});
        level6.size.set(200, 50);
        level6.borderWidth = 2;
        level6.borderColor = Color.WHITE;
        level6.backgroundColor = Color.BLACK;
        level6.onClickEventId = "level6";

        const levelBack = this.add.uiElement(UIElementType.BUTTON, "level_select", {position: new Vec2(center.x, center.y + 250), text: "Back"});
        levelBack.size.set(200, 50);
        levelBack.borderWidth = 2;
        levelBack.borderColor = Color.WHITE;
        levelBack.backgroundColor = Color.BLACK;
        levelBack.onClickEventId = "menu";


        // Add about button
        const about = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x - 200, center.y + 175), text: "About"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.WHITE;
        about.backgroundColor = Color.BLACK;
        about.onClickEventId = "about";

        /* ########## ABOUT SCREEN ########## */
        this.about = this.addUILayer("about");
        this.about.setHidden(true);

        const aboutHeader = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 250), text: "About"});
        aboutHeader.textColor = Color.BLACK;
        aboutHeader.fontSize = 45;

        const text4 = "Our protagonist, Tim the Cow, has lived a peaceful and uneventful life on the farm, spending ";
        const text5 = "his days grazing and farting to his heart’s content. That is, until extra-terrestrial cattle"; 
        const text6 = "rustlers from udder space threaten his way of life and begin abducting his fellow bovines."; 

        const text7 = "Tim must reach the alien mothership and defeat the aliens by pushing the large red self-destruct"; 
        const text8 = "button that will destroy the alien fleet and save his cattle friends. Using his beefy legs, Tim"; 
        const text9 = "will overcome obstacles and traverse the dangerous landscape all while avoiding being detected"; 
        const text10 = "by the aliens. Steaks are high; will Tim prevail?";

        const line4 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 180), text: text4});
        const line5 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 145), text: text5});
        const line6 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 110), text: text6});
        const line7 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 40), text: text7});
        const line8 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y - 5), text: text8});
        const line9 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 30), text: text9});
        const line10 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 65), text: text10});

        line4.textColor = Color.BLACK
        line5.textColor = Color.BLACK;
        line6.textColor = Color.BLACK;
        line7.textColor = Color.BLACK;
        line8.textColor = Color.BLACK;
        line9.textColor = Color.BLACK;
        line10.textColor = Color.BLACK;
       
        line4.fontSize = 22;
        line5.fontSize = 22;
        line6.fontSize = 22;
        line7.fontSize = 22;
        line8.fontSize = 22;
        line9.fontSize = 22;
        line10.fontSize = 22;
       
        const text1 = "This game was created by Peter Christensen, Kevin Mai, and Jacob Richichi";
        const text2 = "using the Wolfie2D game engine, a TypeScript game engine created by";
        const text3 = "Joe Weaver and Richard McKenna.";

        const line1 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 120), text: text1});
        const line2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 140), text: text2});
        const line3 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(center.x, center.y + 160), text: text3});

        line1.textColor = Color.BLACK;
        line2.textColor = Color.BLACK;
        line3.textColor = Color.BLACK;
        line1.fontSize = 18;
        line2.fontSize = 18;
        line3.fontSize = 18;


        const aboutBack = this.add.uiElement(UIElementType.BUTTON, "about", {position: new Vec2(center.x, center.y + 250), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderWidth = 2;
        aboutBack.borderColor = Color.WHITE;
        aboutBack.backgroundColor = Color.BLACK;
        aboutBack.onClickEventId = "menu";

        // Add controls button
        const control = this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(center.x + 200, center.y + 175), text: "Controls"});
        control.size.set(200, 50);
        control.borderWidth = 2;
        control.borderColor = Color.WHITE;
        control.backgroundColor = Color.BLACK;
        control.onClickEventId = "control"; 
    
         /* ########## CONTROLS SCREEN ########## */
        this.control = this.addUILayer("control");
        this.control.setHidden(true);

        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        controlsHeader.textColor = Color.BLACK;
        controlsHeader.fontSize = 45;


        const controls1 = "AD to Move Left and Right"
        const controls2 = "W to Jump"
        const controls3 = "E to Hide under Box"
        const controls4 = "R to Remove Box"
        const controls5 = "Q to Fart"
        const controls6 = "ESC to Pause"

        const control_line1 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 150), text: controls1});
        const control_line2 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 100), text: controls2});
        const control_line3 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y - 50), text: controls3});
        const control_line4 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y), text: controls4});
        const control_line5 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y + 50), text: controls5});
        const control_line6 = <Label>this.add.uiElement(UIElementType.LABEL, "control", {position: new Vec2(center.x, center.y + 100), text: controls6});

        control_line1.textColor = Color.BLACK;
        control_line2.textColor = Color.BLACK;
        control_line3.textColor = Color.BLACK;
        control_line4.textColor = Color.BLACK;
        control_line5.textColor = Color.BLACK;
        control_line6.textColor = Color.BLACK;

        const controlBack = this.add.uiElement(UIElementType.BUTTON, "control", {position: new Vec2(center.x, center.y + 250), text: "Back"});
        controlBack.size.set(200, 50);
        controlBack.borderWidth = 2;
        controlBack.borderColor = Color.WHITE;
        controlBack.backgroundColor = Color.BLACK;
        controlBack.onClickEventId = "menu";
    

        // Subscribe to the button events
        this.receiver.subscribe("play");
        this.receiver.subscribe("about");
        this.receiver.subscribe("menu");
        this.receiver.subscribe("control");
        this.receiver.subscribe("level_select");
        this.receiver.subscribe(["level1", "level2", "level3", "level4", "level5", "level6"]);

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
    }
    updateScene(){
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();

            console.log(event);

            if(event.type === "play"){
                let sceneOptions = {
                    physics: {
                        groupNames: ["ground", "player"],
                        collisions:
                        [
                            [0, 1, 1],
                            [1, 0, 0]
                        ]
                    }
                }
                this.sceneManager.changeToScene(Level1, {}, sceneOptions);
            }

            if(event.type === "level1"){
                let sceneOptions = {
                    physics: {
                        groupNames: ["ground", "player"],
                        collisions:
                        [
                            [0, 1, 1],
                            [1, 0, 0]
                        ]
                    }
                }
                this.sceneManager.changeToScene(Level1, {}, sceneOptions);
            }


            if(event.type === "about"){
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
            }

            if(event.type === "menu"){
                this.mainMenu.setHidden(false);
                this.startScreen.setHidden(true);
                this.about.setHidden(true);
                this.control.setHidden(true);
                this.level_select.setHidden(true)
            }
            if(event.type === "control"){
                this.mainMenu.setHidden(true);
                this.control.setHidden(false);
            }
            if(event.type === "level_select"){
                this.mainMenu.setHidden(true);
                this.level_select.setHidden(false);
            }

        }
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu"});
    }
}