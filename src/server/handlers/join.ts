import {JoinRequest, JoinResponse} from "../../model/signals/fromClient/join";

import {Handler} from "../types/handler";
import {table} from "../data";
import {PlayerData} from "../../model/playerData";

export const handleJoin: Handler<JoinRequest, JoinResponse> =
    (request, socketId) => {
        console.log("handling join")
        table.changeOrCreateConnectedSocket(request.playerId, socketId)

        const players: PlayerData[] = table.getPlayerData();
        const isFull: boolean = table.isGameFull();
        const hasGameStarted: boolean = table.hasGameStarted()

        const response: JoinResponse = {players, isFull, hasGameStarted}
            console.log(response)
        return response
    }