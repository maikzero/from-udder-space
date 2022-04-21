import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { FUS_Events } from "../fus_enums";
import { FUS_Color } from "../fus_color";
import EnemyController from "./EnemyController";
import Patrol from "./AlienStates/Patrol";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
//import Fire from "./AlienStates/Fire";
//import MoveCloser from "./AlienStates/MoveCloser";

export enum AlienStates {
	FIRE = "fire",
	PATROL = "patrol",
    MOVE_CLOSER = "move_closer"
}

export default class AlienController extends EnemyController {
    speed: number = 100;
	gravity: number = 1000;

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)

        // Ground alien has 3 states, patrolling, firing, and moving to a better position
        // State transitions will be handled in the update method, Balloon method of state transition
        // Not top down shooter GOAP
        this.addState(AlienStates.PATROL, new Patrol(this, owner, options.startPosition));
        //this.addState(AlienStates.FIRE, new Fire(this, owner))
        //this.addState(AlienStates.MOVE_CLOSER, new MoveCloser(this, owner))

        // TODO: Add more attributes specific to certain aliens (Health, weapon, etc)

        this.direction = new Vec2(-1, 0);

        // Initialize starting state as patrol
        this.initialize(AlienStates.PATROL)

        this.getPlayerPosition()
    }

    // TODO, need to figure out how TopDownShooter method works, prob gonna go to OH
    // That implementation can prob be ported to this, with some adjustments
    // Override the parent Enemy method
    // I believe getPlayerPosition in EnemyController will go to this method, not positive though
    isPlayerVisible(pos: Vec2): Vec2 {
        // Get the new player location
        let start = this.owner.position.clone();
        let delta = pos.clone().sub(start);

        // Iterate through the tilemap region until we find a collision
        let minX = Math.min(start.x, pos.x);
        let maxX = Math.max(start.x, pos.x);
        let minY = Math.min(start.y, pos.y);
        let maxY = Math.max(start.y, pos.y);

        // Get the wall tilemap
        let walls = <OrthogonalTilemap>this.owner.getScene().getLayer("Wall").getItems()[0];

        let minIndex = walls.getColRowAt(new Vec2(minX, minY));
        let maxIndex = walls.getColRowAt(new Vec2(maxX, maxY));

        let tileSize = walls.getTileSize();

        for (let col = minIndex.x; col <= maxIndex.x; col++) {
            for (let row = minIndex.y; row <= maxIndex.y; row++) {
                if (walls.isTileCollidable(col, row)) {
                    // Get the position of this tile
                    let tilePos = new Vec2(col * tileSize.x + tileSize.x / 2, row * tileSize.y + tileSize.y / 2);

                    // Create a collider for this tile
                    let collider = new AABB(tilePos, tileSize.scaled(1 / 2));

                    let hit = collider.intersectSegment(start, delta, Vec2.ZERO);

                    if (hit !== null && start.distanceSqTo(hit.pos) < start.distanceSqTo(pos)) {
                        // We hit a wall, we can't see the player
                        return null;
                    }
                }
            }
        }

        return pos;
    }

    getPlayerPosition(): Vec2 {
        //Get the position of the closest player in sight
        let pos = this.player.position;
        let position = this.isPlayerVisible(pos);

        // Return the position if the player is visible
        return position
    }

    changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}