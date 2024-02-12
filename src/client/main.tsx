import {createRoot} from "react-dom/client";
import {io} from "socket.io-client";

document.body.innerHTML = "<div id='app'></div>"

const root = createRoot(document.getElementById("app"));
root.render(<h1 onClick={()=>{
    const socket = io()


}}>hello</h1>);