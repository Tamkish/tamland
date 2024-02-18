import {coverPlayerGameData, PlayerGameData} from "./playerGameData";
import {v4} from "uuid";
import {table} from "../server/data";
import Enumerable from "linq";
import from = Enumerable.from;

export type PlayerData = {
    isHost:boolean
    playerId: string,
    color: any //COLOR ENUM
    name: string
    gameData: PlayerGameData | null
}

export const generateRandomPlayer = (playerId: (string | null) = null) => {
    const temporary_colors = ["red", "aqua", "yellow", "orange", "green"]
    const temporary_names = ["Joe", "Lily", "Frank", "Sandra", "James", "Lisa", "David", "Richard", "Karen", "Andrew", "Carol", "Brian", "Steph"]
    const temporary_emojis = ["😀", "🙄", "😫", "😛", "😲", "😤", "😬", "😎", "🤩", "🤡", "🤠", "🧐", "🤓"]

    const color = temporary_colors[Math.floor(Math.random() * temporary_colors.length)]
    const name = temporary_names[Math.floor(Math.random() * temporary_names.length)]
        + " " + temporary_emojis[Math.floor(Math.random() * temporary_emojis.length)]

    const isHost = false;

    const randomPlayer: PlayerData = {
        isHost,
        playerId: playerId ?? v4(),
        color,
        name,
        gameData: null
    }

    return randomPlayer
}

export const coverPlayerData = (original: PlayerData) => {
    const covered = structuredClone(original);
    covered.gameData = coverPlayerGameData(covered.gameData)
}