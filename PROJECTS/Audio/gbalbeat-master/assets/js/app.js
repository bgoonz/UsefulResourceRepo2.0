// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
import {Socket, Presence} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

import Pd from "webpd"
window.Pd = Pd;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

window.id = uuidv4();
window.room = document.getElementById("room_id").innerHTML;

window.history.pushState({page: "same"}, "same page", "/?id=" + window.room);

let socket = new Socket("/socket", {
    //logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }),
    params: {user_id: window.id, room_id: window.room}
})






// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("music:" + window.room, {})

let presence = new Presence(channel)

function renderOnlineUsers(presence) {
    let response = ""
  
    presence.list((id, {metas: [first, ...rest]}) => {
      let count = rest.length + 1
      response += `<li>${id}</li>`
    })
  
    DOM.aboutPopupContent.getElementsByTagName("ul").online_list.innerHTML = response;
}

  window.renderOnlineUsers = renderOnlineUsers;
  
  
presence.onSync(() => renderOnlineUsers(presence))

presence.onJoin(() => {
    DAW.stop();
    document.getElementById("playToggle").setAttribute("data-dir", "up")
    DAW.compositionFocus( "-f" );
})

window.presence = presence;

socket.connect();

channel.on("new:msg", (msg) => {
    if(msg["packets"] != undefined) {
        // reset daw
        for(var i = 0; i < UIhistoryActions.size; i++) DAW.history.undo();
        const packets = msg["packets"];
        packets.forEach(packet => {
            const p = JSON.parse(packet);
            try{
                DAW.callActionNoSend(p["action"], ...p["args"])
            } catch(e) {
                console.log("failed to apply action... " + e.message)
            }

            
        });
        return;
    }
    if(msg["id"] == window.id)
        return;
    if(msg["room"] != window.room)
        return;

    if(msg["set_time"] != undefined && msg["set_time"] == true && msg["beat"] != undefined){
        const beat = msg["beat"];
        UIclock.setTime( beat );
    }

    // live pianoroll
    if(msg["midi"] != undefined){
        const midi = msg["midi"];
        if(msg["live_key_up"] == true) {
            DAW.pianoroll.liveKeyupNoSend(midi);
        } else {
            DAW.pianoroll.liveKeydownNoSend(midi);
        }
        
    }

    if(msg["play"] != undefined && msg["play"] == true) {
        DAW.play();
        return;
    } else if(msg["play"] != undefined && msg["play"] == false) {
        DAW.pause();
        return;
    }
    if(msg["stop"] != undefined && msg["stop"] == true){
        DAW.stop();
        return;
    }
    if(msg["action"] != undefined && msg["args"] != undefined) {
        try{
            DAW.callActionNoSend(msg["action"], ...msg["args"])
        } catch(e) {
            console.log("failed to apply action... " + e.message)
        }

        return;
    }
    if(msg["composition_mode"] != undefined && msg["composition_mode"] != true) {
        document.getElementById("playToggle").setAttribute("data-dir", "up")
        DAW.compositionFocus( "-f" );
        return;
    } else if (msg["composition_mode"] != undefined && msg["composition_mode"] != false) {
        document.getElementById("playToggle").setAttribute("data-dir", "down")
        DAW.pianorollFocus( "-f" );
        return;
    }

    
    
})

window.socket = socket;
window.channel = channel;

// import 'web-midi-api';



import WebMidi from "webmidi";
window.WebMidi = WebMidi;

import "../../assets/static/wam/webcz101/dist/wam.min.js"
import "../../assets/static/wam/webcz101/dist/webcz101.min.js"


require("../../daw/src/run.js")