import {Signal} from "../signal";
import {PlayerData} from "../../playerData";

export type GetPlayersSignal = Signal<GetPlayersRequest, GetPlayersResponse>

export type GetPlayersRequest = {  }

export type GetPlayersResponse = {
    players: PlayerData
}