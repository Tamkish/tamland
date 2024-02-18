import {NoReplySignal, Signal} from "../signal";
import {PlayerData} from "../../playerData";


export type LobbyChangedSignal = NoReplySignal<LobbyChangedData>

export type LobbyChangedData = {
    hasGameStarted: boolean
    players: PlayerData[],
}

