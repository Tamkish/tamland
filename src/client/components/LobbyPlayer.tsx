import {PlayerData} from "../../model/playerData";
import {getOrGeneratePlayerId} from "../playerId";

export const LobbyPlayer = (props: { playerData: PlayerData, }) => {
    const data = props.playerData;
    const myPlayerId = getOrGeneratePlayerId();
    const isThisMe = data.playerId === myPlayerId;

    return <ul style={{color:data.color}}>
        {isThisMe && <span style={{color:"white",fontWeight:"bold"}}>(you)</span>}
        <li>name: {data.name}</li>
        <li>color: {data.color}</li>

        {/*todo cards*/}

    </ul>
}