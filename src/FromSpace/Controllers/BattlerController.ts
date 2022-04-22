import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";

export default interface BattlerController extends StateMachineAI {
    health: number;

    damage: (damage: number) => void;
}