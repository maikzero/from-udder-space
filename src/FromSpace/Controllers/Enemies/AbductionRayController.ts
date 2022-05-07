import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import Map from "../../../Wolfie2D/DataTypes/Map";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Stack from "../../../Wolfie2D/DataTypes/Stack";
import State from "../../../Wolfie2D/DataTypes/State/State";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import GameNode, { TweenableProperties } from "../../../Wolfie2D/Nodes/GameNode";
import Line from "../../../Wolfie2D/Nodes/Graphics/Line";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { EaseFunctionType } from "../../../Wolfie2D/Utils/EaseFunctions";
import { FUS_Events } from "../../fus_enums";
import Abducting from "./AbductionRayStates/Abducting";
import Active from "./AbductionRayStates/Active";
import Paused from "./AbductionRayStates/Paused";
import UFOController from "./UFOController";

export enum AbductionRayStates {
    ACTIVE = "active",
    INACTIVE = "inactive",
    ABDUCTING = "abducting",
    PAUSED = "paused"
}

export default class AbductionRayController extends StateMachineAI  {
    protected owner: GameNode;
    direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;
    speed: number = 0;
    ufo: GameNode;
    startPosition: Vec2;
    index: number;
    player: GameNode;
    paused: Boolean;
    

    initializeAI(owner: GameNode, options: Record<string, any>){
        super.initializeAI(owner, options)
        this.owner = owner;
        (<Line>this.owner).tweens.add("fade", {
            startDelay: 0,
            duration: 300,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.OUT_SINE
                }
            ],
            onEnd: FUS_Events.UNLOAD_ASSET
        });

        this.ufo = options.ufo
        this.startPosition = options.startPosition
        this.index = options.index
        this.direction = options.direction
        this.player = options.player
        this.addState(AbductionRayStates.ACTIVE, new Active(this, owner));
        this.addState(AbductionRayStates.ABDUCTING, new Abducting(this, owner));
        this.addState(AbductionRayStates.PAUSED, new Paused(this, owner));

        this.initialize(AbductionRayStates.ACTIVE)
    }

    updateRay(): void {
        let start = this.startPosition.clone();
        let end = this.startPosition.clone().add(this.direction.scaled(900));
        let delta = end.clone().sub(start);

        // Iterate through the tilemap region until we find a collision
        let minX = Math.min(start.x, end.x);
        let maxX = Math.max(start.x, end.x);
        let minY = Math.min(start.y, end.y);
        let maxY = Math.max(start.y, end.y);
        // Get the wall tilemap
        let walls = <OrthogonalTilemap>this.owner.getScene().getLayer("Main").getItems()[0];

        let minIndex = walls.getColRowAt(new Vec2(minX, minY));
		let maxIndex = walls.getColRowAt(new Vec2(maxX, maxY));

        let tileSize = walls.getTileSize();

        for(let col = minIndex.x; col <= maxIndex.x; col++){
            for(let row = minIndex.y; row <= maxIndex.y; row++){
                if(walls.isTileCollidable(col, row)){
                    // Get the position of this tile
                    let tilePos = new Vec2(col * tileSize.x + tileSize.x/2, row * tileSize.y + tileSize.y/2);

                    // Create a collider for this tile
                    let collider = new AABB(tilePos, tileSize.scaled(1/2));

                    let hit = collider.intersectSegment(start, delta, Vec2.ZERO);

                    if(hit !== null && start.distanceSqTo(hit.pos) < start.distanceSqTo(end)){
                        end = hit.pos;
                    }
                }
            }
        }

        (<Line>this.owner).start = start;
        (<Line>this.owner).end = end;
        (<Line>this.owner).tweens.play('fade')

    }

    hits(): boolean {
        if ((<UFOController>this.ufo._ai).invincible) {
            return false
        }
        let line = <Line>this.owner
        return this.player.collisionShape.getBoundingRect().intersectSegment((line).start, line.end.clone().sub(line.start)) !== null
    }

    update(deltaT: number): void {
		super.update(deltaT);
	}
    changeState(stateName: string): void {
        super.changeState(stateName);
	}
}