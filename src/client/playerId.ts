import {getCookie, setCookie} from "typescript-cookie";
import {v4 as uuidv4} from "uuid";


const COOKIE_KEY = "playerId"
export const getOrGeneratePlayerId = () => {
    const playerId = getCookie(COOKIE_KEY);
    if (playerId === undefined) {
        return generateNewId();
    } else {
        return playerId
    }
}

const generateNewId = () => {
    const newPlayerId = uuidv4();
    setCookie(COOKIE_KEY, newPlayerId, {expires:2})
    return newPlayerId;
}