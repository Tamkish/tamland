/*import {Signal} from "../signal";
import {PlayerData} from "../../playerData";

export type GetPlayersSignal = Signal<GetPlayersRequest, GetPlayersResponse>

export type GetPlayersRequest = {  }

export type GetPlayersResponse = {
    players: PlayerData
}*/

import {Signal} from "../signal";

export type DisconnectSignal = Signal<DisconnectRequest, DisconnectResponse>


export type DisconnectResponse = {
}

export type DisconnectRequest = {
}
