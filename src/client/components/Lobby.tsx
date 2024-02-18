import {useEffect, useState} from "react";
import {PlayerData} from "../../model/playerData";
import {Loading} from "./Loading";
import {socket} from "../socket";
import {getOrGeneratePlayerId} from "../playerId";
import {LobbyPlayer} from "./LobbyPlayer";
import Enumerable from "linq";
import from = Enumerable.from;


export const Lobby = (props: { startGame: () => void }) => {
    const [players, setPlayers] = useState<PlayerData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const isHost = from(players).any(playerData => playerData.isHost && playerData.playerId === getOrGeneratePlayerId())

    useEffect(() => {
        socket.emit(
            "join",
            {playerId: getOrGeneratePlayerId()},
            response => {
                setPlayers(response.players)
                setIsLoading(false)
            })


        socket.on("lobbyChange", data => {
            setPlayers(data.players)
            if (data.hasGameStarted) {
                props.startGame();
            }
        })

        return () => {

        }
    }, []);

    if (isLoading)
        return <Loading name={"lobby"}/>

    return <>
        <h1>lobby</h1>
        {
            isHost
                ? (<div>you are the host. start the game (todo)</div>)
                : null

        }
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