export type PlayerGameData = {}
export const coverPlayerGameData = (original: PlayerGameData) => {
    return structuredClone(original) //todo
}