import * as http from "http";
import {Server} from "socket.io";
import {SignalsFromClient} from "../model/signals/signalsFromClient";
import {SignalsFromServer} from "../model/signals/signalsFromServer";
import {InterServerEvents, SocketData} from "../model/signals/signalsInternal";
import {table} from "./data";
import {PlayerData} from "../model/playerData";
import {JoinResponse} from "../model/signals/fromClient/join";
import {Socket} from "socket.io-client";
import {LobbyChangedData} from "../model/signals/fromServer/lobbyChange";

export const createSocketServer = (httpServer: http.Server) => {
    const io = new Server<SignalsFromClient, SignalsFromServer, InterServerEvents, SocketData>(httpServer);

    io.on("connection", (socket) => {
        console.log(socket.id + " connected")

        socket.on("join", (request, reply) => {
            table.changeOrCreateConnectedSocket(request.playerId, socket.id)
            table.updateWhoIsHost()

            const players: PlayerData[] = table.getPlayerData();
            const isFull: boolean = table.isGameFull();
            const hasGameStarted: boolean = table.hasGameStarted()
            const response: JoinResponse = {players, isFull, hasGameStarted}

            const lobbyChangedData: LobbyChangedData = {
                hasGameStarted,
                players
            }

            reply(response)
            socket.broadcast.emit("lobbyChange", lobbyChangedData)
        })
        socket.on("disconnect", () => {
            if (!table.hasGameStarted()) {
                table.deleteConnection(socket.id)
                socket.broadcast.emit("lobbyChange", {
                    hasGameStarted: table.hasGameStarted(),
                    players: table.getPlayerData()
                })
            }
        })


//todo        socket.on("disconnect",(reason, description) =>)

        //when all is done, send welcome
        socket.emit("welcome");
    })
}