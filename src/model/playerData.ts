import {coverPlayerGameData, PlayerGameData} from "./playerGameData";
import {v4} from "uuid";

export type PlayerData = {
    playerId: string,
    color: any //COLOR ENUM
    name: string
    gameData: PlayerGameData | null
}

export const generateRandomPlayer = (playerId: (string | null) = null) => {
    const temporary_colors = ["red", "aqua", "yellow","orange","green"]
    const temporary_names = ["Joe", "Lily", "Frank", "Sandra"]

    const color = temporary_colors[Math.floor(Math.random() * temporary_colors.length)]
    const name = temporary_names[Math.floor(Math.random() * temporary_names.length)]


    const randomPlayer: PlayerData = {
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