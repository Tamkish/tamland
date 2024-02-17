import {io, Socket} from "socket.io-client";
import {SignalsFromClient} from "../model/signals/signalsFromClient";
import {SignalsFromServer} from "../model/signals/signalsFromServer";

export const socket: Socket<SignalsFromServer, SignalsFromClient> = io({autoConnect: false})