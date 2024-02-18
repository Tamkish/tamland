import {generateRandomPlayer, PlayerData} from "../model/playerData";
import Enumerable from "linq";
import from = Enumerable.from;


type Connection = {
    socketId: string,
    playerId: string,
    playerData: PlayerData
}

type Board = {}
const maxPlayers = 4;

class Table {

    connections: Connection[];
    board: Board | null;

    constructor() {
        this.connections = [];
        this.board = null; // game has not started
    }


    changeOrCreateConnectedSocket = (playerId: string, socketId: string) => {
        let foundTheConnection = false;
        from(this.connections)
            .forEach(connection => {
                if (connection.playerId !== playerId)
                    return;

                if (foundTheConnection) {
                    console.error("maybe have multiple connections of same player") //proabbly shouldnt happen
                    console.log(this.connections.map(connection => `{socket:${connection.socketId},player:${connection.playerId}`).join(","))
                } else {
                    foundTheConnection = true;
                    connection.socketId = socketId
                }


            })
        if (!foundTheConnection) {
            const newConnection: Connection = {playerId, socketId, playerData: generateRandomPlayer(playerId)}
            this.connections.push(newConnection)
        }
    };
    deleteConnection = (socketId: string) => {
        this.connections = from(this.connections)
            .where(connection => connection.socketId !== socketId)
            .toArray()
    }
    hasGameStarted = () => this.board !== null;
    getPlayerData = () => {
        console.log(this.connections)
        return this.connections.map(connection => connection.playerData)
    };
    isGameFull = () => this.connections.length >= maxPlayers;
    updateWhoIsHost = () => {
        let foundHost = false;
        const hostConnetions = from(this.connections)
            .where(connection => connection.playerData.isHost);
        const count = hostConnetions.count()
        if (count > 1) {
            console.error("multiple hosts")
        } else if (count === 1) {
            hostConnetions.first().playerData.isHost = true;
        }

    }

}

export const table = new Table()