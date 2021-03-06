
import Game from "./Wolfie2D/Loop/Game";
import default_scene from "./default_scene";
import MainMenu from "./FromSpace/Scenes/MainMenu";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){
    // Run any tests
    runTests();

    // Set up options for our game
    let options = {
        canvasSize: {x: 1200, y: 800},          // The size of the game
        clearColor: {r: 90, g: 90, b: 90},   // The color the game clears to
        inputs: [
            {name: "jump", keys: ["w"]},
            {name: "left", keys: ["a"]},
            {name: "right", keys: ["d"]},
            {name: "hide", keys: ["e"]},
            {name: "unhide", keys: ["r"]},
            {name: "attack", keys: ["q"]},
            {name: "slot1", keys: ["1"]},
            {name: "slot2", keys: ["2"]},
            {name: "pause", keys: ["escape"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(MainMenu, {});
})();

function runTests(){};