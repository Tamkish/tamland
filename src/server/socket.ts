import * as http from "http";
import {Server} from "socket.io";

let socketServer : Server;

export const createSocketServer = (httpServer: http.Server) => {
    socketServer = new Server(httpServer);

    socketServer.on("connection", socket => {
        console.log(socket.id + " connected")
    })
}