import {Signal} from "../signal";
import {PlayerData} from "../../playerData";

export type JoinSignal = Signal<JoinRequest, JoinResponse>

export type JoinRequest = {
    playerId:string,
}

export type JoinResponse = {
    isFull:boolean;
    hasGameStarted:boolean
    players: PlayerData[],

}
