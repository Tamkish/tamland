import {Signal} from "../signal";

export type GameStatusUpdateSignal = Signal<GameStatusUpdateRequest, GameStatusUpdateResponse>

export type GameStatusUpdateRequest = {}


export type GameStatusUpdateResponse = {
    hasGameStarted:boolean
}
