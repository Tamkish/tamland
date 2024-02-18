import {EmptySignal, Signal} from "./signal";
import {LobbyChangedSignal} from "./fromServer/lobbyChange";

export interface SignalsFromServer {
    welcome: EmptySignal,
    lobbyChange: LobbyChangedSignal

}