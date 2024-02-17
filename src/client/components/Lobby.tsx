import {useEffect, useState} from "react";
import {PlayerData} from "../../model/playerData";
import {Loading} from "./Loading";
import {socket} from "../socket";
import {getOrGeneratePlayerId} from "../playerId";
import {LobbyPlayer} from "./LobbyPlayer";


export const Lobby = (props: { startGame: () => void }) => {
    const [players, setPlayers] = useState<PlayerData[]>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        socket.emit(
            "join",
            {playerId: getOrGeneratePlayerId()},
            response => {
                setPlayers(response.players)
                setIsLoading(false)
            })
    }, []);

    if (isLoading)
        return <Loading name={"lobby"}/>

    return <>
        <h1>lobby</h1>
        <h2>players:</h2>
        {
            players.length === 0
                ? <span>empty</span>
                : <ul>
                    {players.map(player =>
                        <li>
                            <LobbyPlayer playerData={player}/>
                        </li>)
                    }
                </ul>
        }

    </>
}