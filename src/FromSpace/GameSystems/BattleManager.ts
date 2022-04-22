import GameNode from "../../Wolfie2D/Nodes/GameNode";
import BattlerController from "../Controllers/BattlerController";
import Weapon from "./items/Weapon";
import AlienController from "../Controllers/Enemies/AlienController";
import PlayerController from "../Controllers/Player/PlayerController";

export default class BattleManager {
    players: Array<BattlerController>;

    enemies: Array<BattlerController>;

    handleInteraction(attackerType: string, weapon: Weapon) {
        if (attackerType === "player") {
            // Check for collisions with enemies
            for (let enemy of this.enemies) {
                if (weapon.hits((<AlienController>enemy).owner)) {
                    enemy.damage(weapon.type.damage);
                }
            }
        } else {
            // Check for collision with player
            for (let player of this.players) {
                if (weapon.hits((<PlayerController>player).owner)) {
                    player.damage(weapon.type.damage);
                }
            }
        }
    }

    setPlayers(player: Array<BattlerController>): void {
        this.players = player;
    }

    setEnemies(enemies: Array<BattlerController>): void {
        this.enemies = enemies;
    }
}