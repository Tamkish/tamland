import {useEffect, useState} from "react";
import {socket} from "../socket";
import {getOrGeneratePlayerId} from "../playerId";
import {Loading} from "./Loading";
import {Lobby} from "./Lobby";
import {Game} from "./Game";

const ConnectionError = () => <span>Something went wrong with the connection. Scream for help and run!</span>
const GameIsFull = () => <span>the game is full</span>;

export const App = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [gameIsFull, setGameIsFull] = useState(false)
    const [hasGameStarted, setHasGameStarted] = useState(false)

    useEffect(() => {

        socket.on("welcome", () => {
            setIsConnected(true)
            socket.emit(
                "join",
                {playerId: getOrGeneratePlayerId()},
                response => {
                    setGameIsFull(response.isFull)
                    setHasGameStarted(response.hasGameStarted)
                    setIsLoading(false)
                }
            )
        });
        socket.on("connect_error", () => {
            setIsConnected(false)
            setIsLoading(false)
        });
        socket.on("disconnect", () => {
            setIsConnected(false)
            setIsLoading(false)
        });

        socket.connect();
    }, []);

    if (isLoading)
        return <Loading name={"app"}/>

    if (!isConnected) {
        return <ConnectionError/>
    }

    if (gameIsFull) {
        return <GameIsFull/>
    }

    return hasGameStarted
        ? <Game endGame={()=>setHasGameStarted(false)}/>
        : <Lobby startGame={() => setHasGameStarted(true)}/>
}