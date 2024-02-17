import * as http from "http";
import {Server} from "socket.io";
import {SignalsFromClient} from "../model/signals/signalsFromClient";
import {SignalsFromServer} from "../model/signals/signalsFromServer";
import {InterServerEvents, SocketData} from "../model/signals/signalsInternal";
import {handleJoin} from "./handlers/join";

export const createSocketServer = (httpServer: http.Server) => {
    const io = new Server<SignalsFromClient, SignalsFromServer, InterServerEvents, SocketData>(httpServer);

    io.on("connection", (socket) => {
        console.log(socket.id + " connected")
        socket.on("join", (request, reply) => {reply(handleJoin(request,socket.id))})


//todo        socket.on("disconnect",(reason, description) =>)
        socket.emit("welcome")

    })
}